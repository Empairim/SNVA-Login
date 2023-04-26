import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../APIUtils/api"; // Import the registerUser function

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when the form is submitted
    try {
      await registerUser(email, password);
      alert("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call is completed
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
            {/* Display a spinner icon when isLoading is true */}
            <Button variant="primary" type="submit" className="w-100">
              {isLoading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                "Register"
              )}
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
