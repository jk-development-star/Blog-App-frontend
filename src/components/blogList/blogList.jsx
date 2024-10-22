import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import './blogList.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const user = localStorage.getItem('user');
        const response = await axios.get(`https://kbri0uc4wj.execute-api.us-east-1.amazonaws.com/dev/fetchblog`, config, { withCredentials: true});
          if (response.status === 200 && response.data.length > 0) {
            setBlogs(response.data);
            toast.success('Blogs fetched successfully!');
          } else {
            toast.error('No blogs found!');
          }
      } catch (error) {
        toast.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

console.log('blogs',blogs)
  const filteredBlogs = blogs ? blogs.filter((blog) =>
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  };
  const handleDelete = (blogId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const user = localStorage.getItem('user');
        
          axios.delete(`https://kbri0uc4wj.execute-api.us-east-1.amazonaws.com/dev/deleteblog?id=${blogId}`, config, { withCredentials: true})
            .then((response) => {
              if (response.status === 200) {
                Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
                setBlogs(blogs.filter((blog) => blog._id !== blogId));
              } else {
                Swal.fire('Error', 'Failed to delete the blog.', 'error');
              }
            })
            .catch((error) => {
              Swal.fire('Error', 'An error occurred while deleting the blog.', 'error');
              console.error('Error deleting blog:', error);
            });
        } catch (error) {
          Swal.fire('Error', 'An error occurred while deleting the blog.', 'error');
          console.error('Error deleting blog:', error);
        }
      }
    });
  };


  const handleView = async (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <Container fluid className="blog-list-container">
      {isLoading ? (
        <div className="loading-indicator">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="justify-content-center" >
          <Col md={10}>
            <div className="blog-list-header">
              <h2 className="text-center mb-4">Blog List</h2>
              <Form.Group controlId="formSearch" className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search by category..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </div>
            <Row>
              {filteredBlogs.map((blog) => (
                <Col md={6} key={blog._id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{truncateText(blog.blog_name, 40)}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {blog.category}{' '}|{' '}{formatDate(blog.created_on)}
                      </Card.Subtitle>
                      <Card.Text>{truncateText(blog.article, 100)}</Card.Text>
                      <div className="blog-actions">
                        <FaEye
                          className="blog-action-icon" data-test={`blog-view-${blog._id}`}
                          onClick={() => handleView(blog._id)}
                        />
                        <FaTrashAlt
                          className="blog-action-icon"
                          data-test={`blog-delete-${blog._id}`}
                          onClick={() => handleDelete(blog._id)}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
};

export default BlogList;
