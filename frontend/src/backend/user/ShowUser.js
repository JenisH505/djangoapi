import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';

function ShowAllActivities() {
    const [users, setUsers] = useState([]); // Fix variable name from activities to users
    const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/users')
      .then(response => {
        setUsers(response.data); // Fix variable name from activities to users
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (userId, index) => {
    axios.delete(`http://localhost:9000/delete/users/${userId}`)
      .then(response => {
        if (response.data.success) {
          setUsers(prevUsers => prevUsers.filter((user, i) => i !== index));
        } else {
          setError('Failed to delete user');
        }
      })
      .catch(error => {
        setError(error.message);
      });
};



  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3} id="sidebar">
          <Sidebar />
        </Col>
        <Col xs={9} id="content">
        <a href='/admin/adduser' className='btn btn-primary mt-1'>Add New</a>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              <h2>Show All Users</h2>
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                          <Link to={`/admin/editUser/${user._id}`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                          <Button variant="danger" onClick={() => handleDelete(user._id, index)}>Delete</Button> {/* Fix variable name from activity to user */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default ShowAllActivities;
