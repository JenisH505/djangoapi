import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <section className="w-100 p-4" style={{  background: '#0177A8' }}>
      <Container fluid>
        <Row>
          <Col lg={3} md={6} sm={12} className="p-4">
            <h3 style={{ color: 'white' }}>Realestate</h3>
            <div className="m-2 mt-4">
              <p className="text-white font-light text-sm">
              It typically contains a copyright notice, link to a privacy policy, sitemap, logo, contact information, social media icons, and an email sign-up form.</p>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-4 mt-4">
            <p className="font-inner font-semibold text-white text-lg">Quick Links</p>
            <ul className="list-unstyled">
              <li className="text-white mb-2">About</li>
              <li className="text-white mb-2">Blog</li>
              <li className="text-white mb-2">Careers</li>
            </ul>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-4 mt-4">
            <p className="font-inner font-semibold text-white text-lg">Join us on</p>
            <ul className="list-unstyled">
              <li className="text-white mb-2">Facebook</li>
              <li className="text-white mb-2">Instagram</li>
              <li className="text-white mb-2">Twitter</li>
            </ul>
          </Col>
          <Col lg={3} md={6} sm={12} className="p-4 mt-4">
            <p className="font-inner font-semibold text-white text-lg">Download App</p>
            <ul className="list-unstyled">
              <li className="text-white mb-2">Download from App Store</li>
              <li className="text-white mb-2">Download from Play Store</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
