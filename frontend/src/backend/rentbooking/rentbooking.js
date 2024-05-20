import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import Sidebar from '../components/sidebar';

const AdminRentBookingPage = () => {
  const [rentBookings, setRentBookings] = useState([]);
  const { userId } = useParams(); 

  useEffect(() => {
  
    const fetchRentBookings = async () => {
      try {
        const user = localStorage.getItem('user'); 
        const userData = JSON.parse(user);
  
        const user_id = userData._id;
        console.log(user_id);
        const response = await fetch(`/admin/rentbookings`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch rent bookings');
        }
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setRentBookings(data.rentBooking); // Set the retrieved rent bookings in state
        } else {
          throw new Error('Failed to fetch rent bookings');
        }
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
          <Sidebar />
        </Col>
        <Col xs={9} id="content">
          <div>
            <h2>Rent Booking List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rent ID</th>
                  <th>User ID</th>
                  {/* <th>Price</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rentBookings.length > 0 ? (
                  rentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking._id}</td>
                      <td>{booking.user_id}</td>
                      {/* <td>{booking.price}</td> */}
                      <td>{booking.payment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No rent bookings available</td>
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

export default AdminRentBookingPage;
