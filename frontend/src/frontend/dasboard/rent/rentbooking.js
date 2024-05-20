import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import UserSidebar from '../sidebar';

const RentBookingPage = () => {
  const [rentBookings, setRentBookings] = useState([]);
  const { userId } = useParams(); // Get userId from URL params

  useEffect(() => {
    // Fetch activity bookings for the specific user from the server
    const fetchRentBookings = async () => {
      try {
        const user = localStorage.getItem('user'); // Example: Get user ID from local storage
        const userData = JSON.parse(user);
  
        const user_id = userData._id;
        console.log(user_id);
        const response = await fetch(`/user/rentbookings/${user_id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch rent bookings');
        }
        const data = await response.json();
        console.log(data);
        setRentBookings(data); // Set the retrieved rent bookings in state
      } catch (error) {
        console.error('Error fetching rent bookings:', error);
      }
    };

    fetchRentBookings();
  }, [userId]); // Include userId in the dependency array

  return (
    <Container fluid>
      <Row>
        <Col xs={3} id="sidebar">
          <UserSidebar />
        </Col>
        <Col xs={9} id="content">
          <div>
            <h2>Rent Booking List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User Name</th>
                  {/* <th>Price</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rentBookings.length > 0 ? (
                  rentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.rent_id}</td>
                      <td>{booking.user_id}</td>
                      {/* <td>{booking.price}</td> */}
                      <td>{booking.payment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No rent bookings available</td>
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

export default RentBookingPage;
