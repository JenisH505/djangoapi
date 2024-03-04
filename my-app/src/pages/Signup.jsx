import React, { useState, useEffect } from 'react';
import '/Users/jenishmanandhar/djangoapi/my-app/src/Signup.css';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: 'a'
  });

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/api/signup/', formData)

      setSuccessMessage('Account created successfully')
      setErrorMessage('')
      window.location.href = '/login'
    } catch (error) {
      console.error('Error:', error)
      if (error.response) {
        console.log('Response data:', error.response.data)
        console.log('Response status:', error.response.status)
        console.log('Response headers:', error.response.headers)
      }
      setErrorMessage(error.message)
      setSuccessMessage('')
    }
  };

  return (
    <div className='auth-form-container'>
    <form className="signup-form" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <br></br>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <br></br>
      <input type="password" name="password1" placeholder="Password" value={formData.password1} onChange={handleChange} />
      <br></br>
      <input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} />
      <br></br>
      <button type="submit">Sign Up</button>
    </form>
    {successMessage && <div className="success-message">Account created successfully</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <div className="link-btn">
        Already have an account? <a href="/login">Login here</a>.
    </div>
    </div>
  );
};
export default Signup;
