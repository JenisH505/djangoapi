import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const PropertyCard = ({ id, name, location, description,price,image }) => {
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
      <Card.Img variant="top" src={`/images/${image}`} alt="Property Image" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <div className="mt-auto">
        <Link to={`/propertydetail/${id}`} className="btn btn-primary mr-2">
            Read More
          </Link>
          <span style={priceStyle} className="font-weight-bold float-right">
          ${price}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

const PropertyPlaceSection = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await fetch('/get/property');
        if (!response.ok) {
          throw new Error('Failed to fetch property data');
        }
        const { success, houses: fetchedProperties } = await response.json();
        if (success) {
          setProperties(fetchedProperties);
        } else {
          throw new Error('Failed to fetch property data');
        }
      } catch (error) {
        console.error('Error fetching latest properties:', error);
      }
    };

    fetchLatestProperties();
  }, []);

  const sectionStyle = {
    backgroundColor: '#EFEEF4',
    padding: '2rem',
  };

  const headingStyle = {
    color: '#4C4A4A',
    fontFamily: 'Poppins',
    fontSize: '35.5px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <h1 style={headingStyle}>Most Visited Properties</h1>
        <Row xs={1} md={2} lg={3} xl={3}>
          {properties && properties.map((property, index) => (
            <Col key={index}>
              <PropertyCard
                id={property._id}
                name={property.name}
                location={property.location}
                description={property.description}
                price={property.price}
                image={property.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PropertyPlaceSection;
