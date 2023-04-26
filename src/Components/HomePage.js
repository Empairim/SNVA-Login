import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Container fluid className="hero-section">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div>
            <h1>Welcome to Some Random Web Name 😄</h1>
          </div>
        </Container>
      </Container>

      <Container>
        <Row className="my-5">
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Feature 1</Card.Title>
                <Card.Text>Short description of the feature.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Feature 2</Card.Title>
                <Card.Text>Short description of the feature.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Feature 3</Card.Title>
                <Card.Text>Short description of the feature.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
