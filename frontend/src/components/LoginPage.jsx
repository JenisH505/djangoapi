import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
        const responseData = await response.json(); // Parse response JSON
  
        // Save user details and token in localStorage
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
  
        // Redirect user to home page
        window.location.href = '/';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  


  const backgroundImgStyle = {
    width: '100%',
    height: '807px',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
    background: 'url(background.png) lightgray 50% / cover no-repeat',
  };

  const loginContainerStyle = {
    width: '80%', // Adjusted width for responsiveness
    maxWidth: '693.158px', // Max width for larger screens
    flexShrink: '0',
    borderRadius: '0 0 12px 12px',
    border: '1px solid #FFF',
    background: 'linear-gradient(180deg, rgba(12, 170, 194, 0.36) 0%, rgba(4, 82, 100, 0.36) 100%)',
    backdropFilter: 'blur(6.699999809265137px)',
    margin: '0 auto',
    marginTop: '5%',
    marginBottom: '5%',
    position: 'relative',
    zIndex: '1',
  };

  const loginButtonStyle = {
    width: '60%', // Adjusted width for responsiveness
    maxWidth: '412.649px', // Max width for larger screens
    flexShrink: '0',
    borderRadius: '22px',
    background: '#0A5F6A',
    boxShadow: '0px 4px 4px 0px #159AAE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    margin: '5% auto', // Centered horizontally
  };

  const buttonTextStyle = {
    width: '100%', // Full width
    height: '77px',
    flexShrink: '0',
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: '2rem', // Responsive font size
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={backgroundImgStyle}></div>
      <Container fluid>
        <div style={loginContainerStyle}>
          <div style={loginButtonStyle}>
            <p style={buttonTextStyle} className='text-center p-4'>Login</p>
          </div>
          <Form className="container" onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Username/Email address</Form.Label>
              <Form.Control className="p-4" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control className="p-4" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </Form.Group>
          
            <div className='text-center'>
              <Button variant="primary" size="lg" className='mt-2' type="submit">
                Login
              </Button>

              <div className='mt-4'>
                <p size='lg' className='text-white'>Don't have an account? Register</p>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
