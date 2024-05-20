import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Header from '../components/Headers';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import PlaceCard from '../components/PlaceCard';
import SearchFilter from '../components/SearchFilter';
import DetailPage from '../components/DetailPage';

function Detail() {
  return (
    <>
    <Navigation/>
   
    <DetailPage/>
    <Footer/>
    </>
  
  );
}

export default Detail;
