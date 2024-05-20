import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Headers = () => {
  const headerStyle = {
    position: 'relative',
    color: 'white',
    overflow:'hidden'
    
  };

  const backgroundImageStyle = {
    width: '100%',
    height: '807px',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
    background: 'url(background.png) lightgray 50% / cover no-repeat',
    overflow:'hidden'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    marginLeft: '10%', // Decreased marginLeft to 10%
  };

  const logoStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    marginRight: '20px',
  };

  const searchContainerStyle = {
    width: '80%', // Increased search div width
    // margin: '0 auto', // Center the container
    borderRadius:'21px'
  };

  const searchInputsContainerStyle = {
    display: 'flex',
    marginBottom: '10px',
  };

  const searchInputStyle = {
    padding: '10px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    width: '100%', // Modified input width to fill available space
  };

  const dateInputStyle = {
    padding: '10px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '5px',
    width: '100%', // Modified input width to fill available space
  };

  const searchButtonStyle = {
    padding: '10px',
    cursor: 'pointer',
    width: '100%'
  };

  const inputSeparatorStyle = {
    width: '1px',
    height: '40px', // Increased border height after each input
    background: 'gray',
    margin: '0 10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };

  const additionalButtonStyle = {
    padding: '10px',
    cursor: 'pointer',
  };
  const iconStyle = {
    fontSize: '24px',
    color: '#0177a8', // Set the color of the icon
    marginRight: '10px',
  };

  const t = {
    // your other styles
    textDecoration: 'none', // Remove text decoration
  };

  
  return (
    <div style={headerStyle}>
      <div style={backgroundImageStyle}></div>
      <Container fluid style={contentContainerStyle}>
 
            <h1 style={logoStyle}>Welcome To Home Page</h1>
        
    
        {/* <div style={searchContainerStyle} className='bg-white p-3 mb-5'>
          <Row className=''>
            <Col md={6}>
              <input type="text" placeholder="Search by place" style={searchInputStyle} className="search-input" />
            </Col>
            <Col md={2} >
              <input type="date" placeholder="From" style={dateInputStyle} className="search-input" />
            </Col>
            <Col md={2}>
              <input type="date" placeholder="To" style={dateInputStyle} className="search-input" />
            </Col>
            <Col md={2}>
            <Link to="/search" style={{ textDecoration: 'none' }}>
              <Button variant="primary"  className='' style={searchButtonStyle}>
                Search
              </Button>
              </Link>
            </Col>
          </Row>
        </div> */}
      </Container>
    </div>
  );
};

export default Headers;
