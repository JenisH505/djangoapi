import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer'

function ShowAllRents() {
  const [rents, setrents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/get/rent/')
      .then(response => {
        if (response.data.success) {
          setrents(response.data.rents);
        } else {
          setError('Failed to fetch rents');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (rentId, index) => {
    axios.delete(`http://localhost:9000/delete/rent/${rentId}`)
      .then(response => {
        if (response.data.success) {
          setrents(prevrents => prevrents.filter((rent, i) => i !== index));
        } else {
          setError('Failed to delete rent');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  
    <>
    <Container fluid>
  <Header />
  <Row>
    <Col xs={3} id="sidebar">
      <Sidebar />
    </Col>
    <Col xs={9} id="content">
<a href='/admin/addrent' className='btn btn-primary mt-1'>Add New</a>

    <div>
      <h2>Show All Rent</h2>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent, index) => (
              <tr key={index}>
                <td>{rent.name}</td>
                <td>{rent.location}</td>
                <td>{rent.description}</td>
                <td>{rent.rating}</td>
                <td>
                  <Link to={`/admin/editrent/${rent._id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(rent._id, index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  
    </Col>
  </Row>
  <Footer />
</Container>
</>
  );
}

export default ShowAllRents;
