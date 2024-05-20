// DashboardLayout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Footer from './components/footer';
import BarGraph from './components/bargraph';
import PieChart from './components/piechart';

function DashboardLayout({ children }) {
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3} id="sidebar">
          <Sidebar />
        </Col>
        <Col xs={9} id="content">
          {children}
          <div>
            <h2>Welcome To </h2>
            
          </div>
          <div>
            <h2>Admin Dashboard</h2>
         
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default DashboardLayout;
