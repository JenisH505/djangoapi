import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Header from '../components/Headers';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import PlaceCard from '../components/PlaceCard';
import SearchFilter from '../components/SearchFilter';

function Home() {
  return (
    <>
    <Navigation/>
    <Header/>
    <SearchFilter/>
    <Footer/>
    </>
  
  );
}

export default Home;
