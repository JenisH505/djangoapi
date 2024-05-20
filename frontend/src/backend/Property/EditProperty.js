import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';

function EditProperty() {
  const { id } = useParams();
  const [house, setHouse] = useState({
    name: '',
    location: '',
    description: '',
    rating: '',
    price: '',
    image: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/edit/property/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched house:', data);
        if (data.success) {
          setHouse(data.house); // Update state with fetched house data
        } else {
          setError('Failed to fetch house');
          console.error('Failed to fetch house:', data);
        }
      })
      .catch(error => {
        setError('Error fetching house');
        console.error('Error fetching house:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouse({
      ...house,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setHouse({
      ...house,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData();
      formData.append('name', house.name);
      formData.append('location', house.location);
      formData.append('description', house.description);
      formData.append('rating', house.rating);
      formData.append('price', house.price);
      formData.append('image', house.image);

      // Send house data to backend to update house details
      const response = await fetch(`/update/property/${id}`, {
        method: 'PUT', // Assuming you're using PUT method to update data
        body: formData
      });
      if (response.ok) {
        console.log('House updated successfully');
        window.location.href = '/admin/showproperty';
      } else {
        setError('Failed to update house');
        console.error('Failed to update house');
      }
    } catch (error) {
      setError('Error updating house');
      console.error('Error updating house:', error);
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
            <h2>Edit property</h2>
            {error && <div>Error: {error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={house.name || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={house.location || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  value={house.description || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="rating">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating"
                  name="rating"
                  value={house.rating || ''}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={house.price || ''}
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
                Update House
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default EditProperty;
