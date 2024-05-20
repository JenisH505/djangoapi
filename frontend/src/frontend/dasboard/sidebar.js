// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';

function UserSidebar() {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/home" className="flex-column">
    
        <Nav.Link href="/user/propertybooking">Booked Property</Nav.Link>
        <Nav.Link href="/user/rentbooking">Booked Rent</Nav.Link>

      </Nav>
    </div>
  );
}

export default UserSidebar;
