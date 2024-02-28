import React, { useState, useEffect } from 'react';
import "/Users/jenishmanandhar/djangoapi/my-app/src/Profilee.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    console.log('Stored username:', storedUsername)
    if (storedUsername !== null && storedUsername !== undefined) {
      setUsername(storedUsername)
    }
  }, []);
  console.log('Username state:', username)

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
                <p className='user-title' >Email: ""</p>
                {/* <button onClick={handleLogout}>Logout</button> */}
                <Logout></Logout>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Profile

{/* <h2>Profile User</h2>
{username ? (
  <p> <strong>{username}</strong></p>
) : (
  <p>No profile data available</p>
)}
<p>Email: ""</p> */}
