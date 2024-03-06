import React, { useState } from "react";
import axios from 'axios';
// import Profile from "./Profile";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const csrftoken = Cookies.get('csrftoken');

  const handleSubmit = e => {
    e.preventDefault()

      if (!formData.username || !formData.password) {
        setErrorMessage('Please enter both username and password.')
        return;
      }
      axiosInstance.post('http://127.0.0.1:8000/auth/api/login/', {
        username: formData.username,
        password: formData.password, 
      }, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      }).then((response) => {
      const { session_id, ip_user } = response.data;
      Cookies.set('session_id', session_id, { path: '/' });
      localStorage.setItem('username', formData.username)
      localStorage.setItem('ip_user', ip_user)
      setErrorMessage('')
      navigate('/profile');
      
      }).catch((error)=>{
        console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password.')
      } else {
        setErrorMessage('An error occurred during login.')
      }
      })

  };
  
  return (
    <div>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <br></br>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <br></br>
          <button type="submit">Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
        <br></br>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Signup here.</button>
      </div>
    </div>
  );
};

export default Login;

// axios.post('http://127.0.0.1:8000/auth/api/login/', {
//   username: formData.username,
//   password: formData.password, 
// }).then((data) => {
//   console.log(data)
//   localStorage.setItem('username', formData.username)
//   setErrorMessage('')
  
//   navigate('/profile');
