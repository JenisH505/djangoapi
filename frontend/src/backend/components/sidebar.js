// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/admin/showusers">Users</Nav.Link>
        <Nav.Link href="/admin/showrents">Rent</Nav.Link>
        <Nav.Link href="/admin/showproperty">Property</Nav.Link>
        <Nav.Link href="/admin/propertybooking">Property Booking</Nav.Link>
        <Nav.Link href="/admin/rentbooking">Rent Booking</Nav.Link>
        <Nav.Link href="/admin/document">Document</Nav.Link>
        
      </Nav>
    </div>
  );
}

export default Sidebar;
