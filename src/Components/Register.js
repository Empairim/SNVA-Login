import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8077";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/v1/user/signup`, {
        email,
        password,
      });
      alert("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <Row className="mt-3">
            <Col className="text-center">
              {/* Link to navigate to the Login component */}
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
