import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate, getFullImageUrl } from "../../../constants/constants";
import Sidebar from "../../common/sidebar/sidebar";
import "./blogDetails.css";
import axios from "axios";

const BlogDetails = ({ slug }) => {
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/v1/api/blog?slug=${slug}`,
          config
        );
        if (response.data.data.length > 0 || response.data.data[0] != null) {
          setBlog(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleBackToList = () => {
    navigate("/blog-list");
  };

  if (loading) {
    return (
      <Container fluid className="blog-detail-container">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="loading-text">Loading...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Sidebar>
      <Container fluid className="blog-detail-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="blog-detail-card">
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={getFullImageUrl(blog.blog_image)}
                  alt={blog.blog_name}
                  className="blog-thumbnail-details"
                />
                <Card.Title>{blog.blog_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {blog.blog_category} | {formatDate(blog.createdAt)} |{" "}
                  <Badge bg="success" className="author-badge">
                    {blog.blog_author}
                  </Badge>{" "}
                </Card.Subtitle>
                <Card.Text className="blog-article-text">
                  {blog.blog_article}
                </Card.Text>
                <Button variant="primary" onClick={handleBackToList}>
                  Back to Blog List
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
};

export default BlogDetails;
