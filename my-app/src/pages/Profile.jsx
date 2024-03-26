import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== null && storedUsername !== undefined) {
      setUsername(storedUsername);
    }

    // Fetch IP address and location data

    axios.get('http://ip-api.com/json')
      .then(response => {
        setIp(response.data.query);
        setLocation(response.data.city + ', ' + response.data.country);
      })
      .catch(error => {
        console.error('Failed to fetch IP and location:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/auth/api/logout/');
      localStorage.removeItem('username'); 
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <div className="App">
      <section className="profile">
        <div className="profile-card">
          <div>
            <h2 className="home-title">Profile</h2>
            {username ? (
              <p className='user-title'> <strong>{username}</strong></p>
            ) : (
              <p className='user-title'>No profile data available</p>
            )}
            <p className='user-title' >IP Address: {ip}</p>
            <p className='user-title' >Location: {location}</p>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <Logout></Logout>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
