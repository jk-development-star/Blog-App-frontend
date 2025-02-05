import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './blogDetails.css';
import axios from 'axios';

const BlogDetails = () => {
  const [blog, setBlog] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v1/api/blog?slug=${slug}`, config);
        if(response.data.data.length > 0 || response.data.data[0] != null){
          setBlog(response.data.data[0]);
        }
        
      } catch (error) {
        console.error('Error fetching blog:', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };

    fetchData();
  }, [slug, navigate]);

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
              <Card.Title>{blog.blog_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {blog.blog_category} {' '} | {' '}{formatDate(blog.createdAt)}{' '} | {' '}
                <Badge bg="success" className="author-badge">
                  {blog.blog_author}
                </Badge>{' '}
              </Card.Subtitle>
              <Card.Text>{blog.blog_article}</Card.Text>
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
