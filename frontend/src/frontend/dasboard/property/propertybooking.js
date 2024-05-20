import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import UserSidebar from '../sidebar';

const PropertyBookingPage = () => {
  const [propertyBookings, setPropertyBookings] = useState([]);
  const { userId } = useParams(); // Get userId from URL params

  useEffect(() => {
    // Fetch property bookings for the specific user from the server
    const fetchPropertyBookings = async () => {
      try {
        const user = localStorage.getItem('user'); // Example: Get user ID from local storage
        const userData = JSON.parse(user);
  
        const user_id = userData._id;
        console.log(user_id);
        const response = await fetch(`/user/propertybookings/${user_id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch property bookings');
        }
        const data = await response.json();
        console.log(data);
        setPropertyBookings(data); // Set the retrieved property bookings in state
      } catch (error) {
        console.error('Error fetching property bookings:', error);
      }
    };

    fetchPropertyBookings();
  }, [userId]); // Include userId in the dependency array

  return (
    <Container fluid>
      <Row>
        <Col xs={3} id="sidebar">
          <UserSidebar />
        </Col>
        <Col xs={9} id="content">
          <div>
            <h2>Property Booking List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Property ID</th>
                  <th>User ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {propertyBookings.length > 0 ? (
                  propertyBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.property_id}</td>
                      <td>{booking.user_id}</td>
                      <td>{booking.payment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No property bookings available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyBookingPage;
