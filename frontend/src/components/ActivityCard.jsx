import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ActivityCard = ({ name, description, price }) => {
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
      <Card.Img variant="top" src="img1.png" alt="Place Image" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="mt-auto">
          <Button variant="primary" className="mr-2">
            Book Now
          </Button>
          <span style={priceStyle} className="font-weight-bold float-right">
            ${price}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

const ActivityPlaceSection = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchLatestActivities = async () => {
      try {
        const response = await fetch('http://localhost:9000/get/activities');
        const { success, activities: fetchedActivities } = await response.json();
        if (success) {
          setActivities(fetchedActivities);
        } else {
          console.error('Error fetching latest activities');
        }
      } catch (error) {
        console.error('Error fetching latest activities:', error);
      }
    };

    fetchLatestActivities();
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
        <h1 style={headingStyle}>Most Visited Activities</h1>
        <Row xs={1} md={2} lg={3} xl={3}>
          {activities && activities.length > 0 && activities.map((activity, index) => (
            <Col key={index}>
              <ActivityCard name={activity.name} description={activity.description} price={activity.price} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ActivityPlaceSection;
