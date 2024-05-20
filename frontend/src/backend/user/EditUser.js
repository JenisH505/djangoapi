import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    role: ''
  });

useEffect(() => {
  fetch(`/edit/users/${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUser(data.user); // Update state with fetched user data
        console.log('Fetched user data:', data.user); // Log user data
      } else {
        console.error('Failed to fetch user:', data);
      }
    })
    .catch(error => console.error('Error fetching user:', error));
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/update/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        console.log('User updated successfully');
        window.location.href = '/admin/showusers';
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3} id="sidebar">
          <Sidebar />
        </Col>
        <Col xs={9} id="content">
          <div>
            <h2>Edit User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={user.username || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  name="password"
                  value={user.password || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="role">
                <Form.Label>Role:</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={user.role || ''}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update User
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default EditUser;
