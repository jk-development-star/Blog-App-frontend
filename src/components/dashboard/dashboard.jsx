import React from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import Sidebar from "../common/sidebar/sidebar";

const AdminDashboard = () => {
  // Static data
  const statsData = {
    totalPosts: 2345,
    activeUsers: 1123,
    totalComments: 8564,
    totalLikes: 15234,
  };

  const recentActivities = [
    {
      id: 1,
      time: "2024-01-20 10:30 AM",
      user: "John Doe",
      activity: "New Post",
      details: "Created 'Getting Started with React'",
      status: "Published",
    },
    {
      id: 2,
      time: "2024-01-20 10:15 AM",
      user: "Jane Smith",
      activity: "Comment",
      details: "Commented on 'JavaScript Tips'",
      status: "Approved",
    },
    {
      id: 3,
      time: "2024-01-20 10:00 AM",
      user: "Mike Johnson",
      activity: "Edit",
      details: "Updated 'Python Tutorial'",
      status: "Pending",
    },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      views: 1234,
      likes: 456,
    },
    {
      id: 2,
      title: "JavaScript Tips",
      views: 987,
      likes: 321,
    },
    {
      id: 3,
      title: "Python Tutorial",
      views: 876,
      likes: 234,
    },
  ];

  const topUsers = [
    {
      id: 1,
      name: "John Doe",
      posts: 25,
      comments: 123,
      likes: 456,
    },
    {
      id: 2,
      name: "Jane Smith",
      posts: 18,
      comments: 98,
      likes: 345,
    },
    {
      id: 3,
      name: "Mike Johnson",
      posts: 15,
      comments: 87,
      likes: 234,
    },
  ];

  const getActivityBadgeColor = (activity) => {
    switch (activity.toLowerCase()) {
      case "new post":
        return "primary";
      case "comment":
        return "info";
      case "edit":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "published":
        return "success";
      case "pending":
        return "warning";
      case "approved":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <Sidebar>
        <Container fluid className="main-content">
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <h2 className="dashboard-title">Admin Dashboard</h2>
            </Col>
          </Row>

          {/* Stats Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="bg-primary text-white">
                <Card.Body>
                  <Card.Title>Total Posts</Card.Title>
                  <h2>{statsData.totalPosts}</h2>
                  <p>
                    <small>↑ 12% from last month</small>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="bg-success text-white">
                <Card.Body>
                  <Card.Title>Active Users</Card.Title>
                  <h2>{statsData.activeUsers}</h2>
                  <p>
                    <small>↑ 5% from last month</small>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="bg-info text-white">
                <Card.Body>
                  <Card.Title>Comments</Card.Title>
                  <h2>{statsData.totalComments}</h2>
                  <p>
                    <small>↑ 8% from last month</small>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="bg-warning text-white">
                <Card.Body>
                  <Card.Title>Total Likes</Card.Title>
                  <h2>{statsData.totalLikes}</h2>
                  <p>
                    <small>↑ 15% from last month</small>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Recent Activities</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>User</th>
                        <th>Activity</th>
                        <th>Details</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>{activity.time}</td>
                          <td>{activity.user}</td>
                          <td>
                            <Badge
                              bg={getActivityBadgeColor(activity.activity)}
                            >
                              {activity.activity}
                            </Badge>
                          </td>
                          <td>{activity.details}</td>
                          <td>
                            <Badge bg={getStatusBadgeColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Popular Posts and User Stats */}
          <Row>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Popular Posts</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Views</th>
                        <th>Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {popularPosts.map((post) => (
                        <tr key={post.id}>
                          <td>{post.title}</td>
                          <td>{post.views}</td>
                          <td>{post.likes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Top Users</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Posts</th>
                        <th>Comments</th>
                        <th>Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.posts}</td>
                          <td>{user.comments}</td>
                          <td>{user.likes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <div className="text-center text-muted py-3 border-top">
                <small>
                  © {new Date().getFullYear()} Blog App. All Rights Reserved.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    </div>
  );
};

export default AdminDashboard;
