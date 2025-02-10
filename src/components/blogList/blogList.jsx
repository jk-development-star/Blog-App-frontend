import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEye, FaEdit } from "react-icons/fa";
import { formatDate } from "../../constants/constants";
import Sidebar from "../sidebar/sidebar";
import "./blogList.css";
import axios from "axios";
import Swal from "sweetalert2";
import { truncateText } from "../../constants/constants";

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/v1/api/blog`,
        config
      );
      if (response.data.status === 200 && response.data.data.length > 0) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      setError("Error fetching blogs");
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Sidebar>
        <Container fluid>
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar>
        <Container fluid>
          <div className="text-center p-5 text-danger">{error}</div>
        </Container>
      </Sidebar>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs
    ? blogs.filter(
        (blog) =>
          blog.blog_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.blog_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`http://localhost:4000/v1/api/blog?slug=${slug}`, config)
            .then((response) => {
              if (response.status === 200) {
                Swal.fire("Deleted!", "The blog has been deleted.", "success");
                fetchBlogs(); // Refresh the blog list
              } else {
                Swal.fire("Error", "Failed to delete the blog.", "error");
              }
            })
            .catch((error) => {
              Swal.fire(
                "Error",
                "An error occurred while deleting the blog.",
                "error"
              );
              console.error("Error deleting blog:", error);
            });
        } catch (error) {
          Swal.fire(
            "Error",
            "An error occurred while deleting the blog.",
            "error"
          );
          console.error("Error deleting blog:", error);
        }
      }
    });
  };

  const handleView = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handleEdit = (slug) => {
    navigate(`/edit-blog/${slug}`);
  };

  return (
    <Sidebar>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">Blog Management</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover className="blog-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>{truncateText(blog.blog_name, 30)}</td>
                        <td>{truncateText(blog.blog_category, 30)}</td>
                        <td>
                          <Badge bg={blog.status ? "success" : "warning"}>
                            {blog.status ? "Active" : "Draft"}
                          </Badge>
                        </td>
                        <td>{formatDate(blog.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn view-btn"
                              onClick={() => handleView(blog.blog_slug)}
                              title="View Blog"
                            >
                              <FaEye />
                            </button>
                            <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(blog.blog_slug)}
                              title="Edit Blog"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(blog.blog_slug)}
                              title="Delete Blog"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
};

export default BlogList;
