import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import KhaltiCheckout from "khalti-checkout-web";
import config from "../frontend/khaltiConfig";

const PropertyDetailPage = () => {
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9000/edit/property/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property detail');
        }
        const data = await response.json();
        setPropertyDetail(data.house);
      } catch (error) {
        console.error('Error fetching property detail:', error);
      }
    };

    fetchPropertyDetail();
  }, [id]);

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

  const handleKhaltiPayment = async (payload) => {
    try {
      const user = localStorage.getItem('user');
      const userData = JSON.parse(user);
      const user_id = userData._id;
      const property_id = id;
      const payment = 'paid';
      const price = propertyDetail.price;

      const response = await fetch('http://localhost:9000/propertybooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, property_id, payment, price, khaltiPayload: payload })
      });

      if (!response.ok) {
        throw new Error('Failed to book property');
      }

      console.log('Property booked successfully');
      const bookingData = { user_id, property_id, payment, price };
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      window.location.href = '/'; // Redirect to success page or home page
    } catch (error) {
      console.error('Error booking property:', error);
    }
  };

  if (!propertyDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>{propertyDetail.name}</Card.Header>
            <Card.Body>
              <img src={`/images/${propertyDetail.image}`} alt={propertyDetail.name} style={{ width: '100%', maxHeight: '600px' }} />
              <Card.Title>{propertyDetail.location}</Card.Title>
              <Card.Text>${propertyDetail.price}</Card.Text>
              <Card.Text>{propertyDetail.description}</Card.Text>
              {isLoggedIn ? (
                <>
                  <Button variant="primary" onClick={() => {
                    let checkout = new KhaltiCheckout(config);
                    checkout.show({ amount: propertyDetail.price * 100 });
                  }}>
                    Book with Khalti
                  </Button>
                </>
              ) : (
                <Button variant="primary" disabled>Login to Book</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetailPage;
