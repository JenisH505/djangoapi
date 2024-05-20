import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import KhaltiCheckout from "khalti-checkout-web";
import khaltiConfig from "../frontend/khaltiConfig";

const RentDetailPage = () => {
  const [rentDetail, setRentDetail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('user');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchRentDetail = async () => {
      try {
        const response = await axios.get(`/edit/rent/${id}`); // Assuming the endpoint for fetching rental details
  
        console.log("data:", response.data);
        setRentDetail(response.data.rent); // Setting rental details to rentDetail state
      } catch (error) {
        console.error('Error fetching rental detail:', error);
      }
    };
  
    fetchRentDetail();
  }, [id]);
  

  const handleBookNow = async (payload) => {
    try {
      const user = localStorage.getItem('user');
      const userData = JSON.parse(user);
      const user_id = userData._id;
      const payment = 'paid';
      const price = rentDetail.price;

      const response = await axios.post('/rentbooking', {
        user_id,
        rent_id: id,
        payment,
        price,
        khaltiPayload: payload
      });

      if (!response.data.success) {
        throw new Error('Failed to book rental');
      }

      console.log('Rental booked successfully');
      localStorage.setItem('bookingData', JSON.stringify(response.data.data));
      // Redirect to the booking success page if needed
      // window.location.href = '/booking-success';
    } catch (error) {
      console.error('Error booking rental:', error);
    }
  };

  if (!rentDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>{rentDetail.name}</Card.Header>
            <Card.Body>
              <img src={`/images/${rentDetail.image}`} alt={rentDetail.name} style={{ width: '100%', maxHeight: '600px' }} />
              <Card.Title>{rentDetail.location}</Card.Title>
              <Card.Text>${rentDetail.price}</Card.Text>
              <Card.Text>{rentDetail.description}</Card.Text>
              {isLoggedIn ? (
                <Button variant="primary" onClick={() => {
                  let checkout = new KhaltiCheckout(khaltiConfig);
                  checkout.show({ amount: rentDetail.price * 100 });
                }}>
                  Rent with Khalti
                </Button>
              ) : (
                <Button variant="primary" disabled>Login to Rent</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RentDetailPage;
