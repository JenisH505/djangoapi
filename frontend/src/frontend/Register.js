import React from 'react'
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

function Register() {
    return (
      <>
      <Navigation/>
   
      <RegisterPage/>
      <Footer/>
      </>
    
    );
  }
  
  export default Register;