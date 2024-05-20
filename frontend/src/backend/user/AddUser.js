import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
function AddUser() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user' // Set default role to 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('User registered successfully');
        // Clear form fields after successful registration
        setFormData({
          email: '',
          username: '',
          password: '',
          role: 'user'
        });
        window.location.href = '/admin/showusers';

      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
  
    <>
    <Container fluid>
  <Header />
  <Row>
    <Col xs={3} id="sidebar">
      <Sidebar />
    </Col>
    <Col xs={9} id="content">
    <div>
      <h2>Register New User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
 
    </Col>
  </Row>
  <Footer />
</Container>
</>
  );
}

export default AddUser;
