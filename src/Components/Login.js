import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { loginUser } from "../APIUtils/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // state to manage loading spinner
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // start loading spinner when login button is clicked
    try {
      const response = await loginUser(email, password);

      if (response.status === "success") {
        const token = response.response;
        dispatch(login(token));
        localStorage.setItem("authToken", token);
        navigate("/home");
      } else {
        alert(response.response);
      }
    } catch (error) {
      alert("Error logging in.");
    }
    setIsLoading(false); // stop loading spinner when login request is complete
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
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
          <Row className="mt-3">
            <Col className="text-center">
              <Link to="/signup">Don't have an account? Register</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
