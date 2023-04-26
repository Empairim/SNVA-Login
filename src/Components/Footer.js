import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light mt-4 py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>Random Web Name 🤪</h5>
            <p>
              We provide some random services for your enjoyment. Feel free to
              explore!
            </p>
          </Col>
          <Col md={3} className="text-center text-md-start">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Register</a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="text-center text-md-start">
            <h6>Contact Us</h6>
            <p>
              Email: support@randomwebname.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>
              &copy; {new Date().getFullYear()} Random Web Name. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
