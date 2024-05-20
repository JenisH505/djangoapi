import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      // Registration successful, redirect or show success message
      console.log('Registration successful');
      window.location.href = '/login';

    } catch (error) {
      console.error('Error registering:', error);
      // Handle error, show error message to user
    }
  };

  const backgroundImgStyle = {
    width: '100%',
    height: '807px',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
    background: 'url(background1.jpeg) lightgray 50% / cover no-repeat',
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
            <p style={buttonTextStyle} className='text-center p-4'>Register</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                className="p-4"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control
                className="p-4"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                className="p-4"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

        

            <div className='text-center'>
              <Button type="submit" variant="primary" size="lg" className='mt-2'>
                Register
              </Button>

              <div className='mt-4'>
                <p size='lg' className='text-white'>Already have an account? Login</p>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
