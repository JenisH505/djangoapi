import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RentCard = ({ id, name, description, price, image }) => {
  const priceStyle = {
    color: '#027CAA',
    fontFamily: 'Poppins',
    fontSize: '29px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  };

  return (
    <Card style={{ width: '22.5rem' }} className="mt-3">
      <Card.Img variant="top" src={`/images/${image}`} alt="Rent Image" height={'200px'} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="mt-auto">
          <Link to={`/detail/${id}`} className="btn btn-primary mr-2">
            Read More
          </Link>
          <span className='text-sm'>(go to detail page to book)</span>
          <span style={priceStyle} className="font-weight-bold float-right">
            ${price}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

const RentSection = () => {
  const [rent, setRent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestRent = async () => {
      try {
        const response = await fetch('http://localhost:9000/get/rent');
        if (!response.ok) {
          throw new Error('Failed to fetch rent data');
        }
        const responseData = await response.json();
        if (responseData.success) {
          setRent(responseData.rents); // Update to use responseData.rents
          console.log('Rent data:', responseData.rents); // Logging rent data
        } else {
          throw new Error('Failed to fetch rent data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLatestRent();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section style={{ backgroundColor: '#EFEEF4', padding: '2rem' }}>
      <Container>
        <h1 style={{ color: '#4C4A4A', fontFamily: 'Poppins', fontSize: '35.5px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal' }}>Most Visited Rent</h1>
        <Row xs={1} md={2} lg={3} xl={3}>
          {rent && rent.map((rental, index) => (
            <Col key={index}>
              <RentCard
                id={rental._id}
                name={rental.name}
                description={rental.description}
                price={rental.price}
                image={rental.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};


export default RentSection;
