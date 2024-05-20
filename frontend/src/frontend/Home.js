import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Header from '../components/Headers';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import PlaceCard from '../components/PlaceCard';
import Chatbot from '../components/Chatbot';
function Home() {
  return (
    <>
    <Navigation/>
    <Header/>
    <PlaceCard/>
    <Chatbot />
    <Footer/>
    </>
  
  );
}

export default Home;
