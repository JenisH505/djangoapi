import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/auth/api/logout/', null, {
      // headers: {
      //   'X-CSRFToken': Cookies.get('csrftoken')
      // },
      withCredentials: true
    })
      .then(() => {
        Cookies.remove('session_id', { path: '/' });
        localStorage.removeItem('username');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;