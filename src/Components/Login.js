import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";

const API_BASE_URL = "http://localhost:8077";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // this is the redux dispatch function

  // Updated to dispatch the login action on successful login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/authenticate`,
        {
          email,
          password,
        }
      );

      if (response.data.status === "success") {
        const token = response.data.response;
        // console.log("Token:", token); // Add this line to log the token value this line was just to test if my token was working since its givien me a tough time lol
        dispatch(login(token));
        localStorage.setItem("authToken", token);
        navigate("/home");
      } else {
        // Display an error message based on the API response
        alert(response.data.response);
      }
    } catch (error) {
      alert("Error logging in.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
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
              Login
            </Button>
          </Form>
          <Row className="mt-3">
            <Col className="text-center">
              {/* Link to navigate to the Register component */}
              <Link to="/signup">Don't have an account? Register</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
