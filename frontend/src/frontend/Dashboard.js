import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UserSidebar from './dasboard/sidebar';
import Header from '../backend/components/header';
import Footer from '../backend/components/footer';

function UserDashboardLayout({ children }) {
  // Dummy data for user details
  const user = {
    email: 'example@example.com',
    username: 'example_user',
    image: 'path_to_user_image.jpg', // Replace with the actual path to the user's image
  };

  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3} id="sidebar">
          <UserSidebar />
        </Col>
        <Col xs={9} id="content">
          <div className="mt-4">
            <h2>User Dashboard</h2>
          </div>
          <Card className="mt-4">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img src={user.image} alt="User Image" />
                </Col>
                <Col md={8}>
                  <Card.Title>Email: {user.email}</Card.Title>
                  <Card.Text>Username: {user.username}</Card.Text>
                  <Button variant="primary">Edit Profile</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="mt-4">
            {children}
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default UserDashboardLayout;
