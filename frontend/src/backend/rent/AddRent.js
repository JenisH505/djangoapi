import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';

function AddRent() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    rating: '',
    image: null, // Initialize image state as null
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    console.log(e.target.files[0]); // Log information about the selected file
    setFormData({
      ...formData,
      image: e.target.files[0] // Update image state with the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData(); // Create FormData object
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('location', formData.location);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('rating', formData.rating);
      formDataWithImage.append('price', formData.price);
      formDataWithImage.append('image', formData.image);

      console.log('Form Data with Image:', formDataWithImage); // Log FormData object

      const response = await fetch('http://localhost:9000/create/rent', {
        method: 'POST',
        body: formDataWithImage // Send FormData object instead of JSON
      });
      if (response.ok) {
        console.log('rent added successfully');
        setFormData({
          name: '',
          location: '',
          description: '',
          rating: '',
          image: null,
          price: ''
        });
        window.location.href = '/admin/showrents';
      } else {
        console.error('Failed to add rent');
      }
    } catch (error) {
      console.error('Error adding rent:', error);
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
              <h2>Add rent</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label>Location:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="rating">
                  <Form.Label>Rating:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add rent
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

export default AddRent;
