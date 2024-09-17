import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './blogDetails.css';
import axios from 'axios';

const BlogDetails = () => {
  const [blog, setBlog] = useState("");
  const { blogId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          }
        };
        const response = await axios.get(`http://localhost:3001/api/v1.0/blogsite/blogs/${blogId}`, config);
        setBlog(response.data);

      } catch (error) {
        console.error('Error fetching blog:', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        } else {
          // Handle other errors
        }
      }
    };

    fetchData();
  }, [blogId, navigate]);

  // 



  const formatDate = (dateInput) => {
    const date = new Date(dateInput); // Convert the input to a Date object

    if (isNaN(date.getTime())) {
      // Handle invalid date input
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


  const handleBackToList = () => {
    navigate('/blog-list');
  };

  return (
    <Container fluid className="blog-detail-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="blog-detail-card">
            <Card.Body>
              <Card.Title>{blog.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {blog.category} | {' '}
                <Badge bg="success" className="author-badge">
                  {blog.user_name}
                </Badge>{' '}
                | {formatDate(blog.createdAt)}
              </Card.Subtitle>
              <Card.Text>{blog.article}</Card.Text>
              <Button variant="primary" onClick={handleBackToList}>
                Back to Blog List
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetails;
