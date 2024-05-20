import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';

function ShowAllPropertys() {
  const [propertys, setpropertys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/get/property/')
      .then(response => {
        console.log(response); // Log the entire response object
        if (response.data.success) {
          setpropertys(response.data.houses);
          console.log(response.data.success);
        } else {
          setError('Failed to fetch propertys');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (propertyId, index) => {
    axios.delete(`/delete/property/${propertyId}`)
      .then(response => {
        if (response.data.success) {
          setpropertys(prevpropertys => prevpropertys.filter((property, i) => i !== index));
        } else {
          setError('Failed to delete property');
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
            <a href='/admin/addproperty' className='btn btn-primary mt-1'>Add New</a>

            <div>
              <h2>Show All property</h2>
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
                    {propertys && propertys.map((property, index) => (
                      <tr key={index}>
                        <td>{property.name}</td>
                        <td>{property.location}</td>
                        <td>{property.description}</td>
                        <td>{property.rating}</td>
                        <td>
                          <Link to={`/admin/editproperty/${property._id}`}>
                            <Button variant="primary">Edit</Button>
                          </Link>
                          <Button variant="danger" onClick={() => handleDelete(property._id, index)}>Delete</Button>
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

export default ShowAllPropertys;
