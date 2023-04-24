import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";

const API_BASE_URL = "http://localhost:8077";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // this is the redux dispatch function
  //updated to dispatch the login action on successful login
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
      const token = response.data.token;
      dispatch(login(token)); // this pertains to the dispatch note above
      // console.log("Token:", token); was a test to see if working
      localStorage.setItem("authToken", token); // Save the token in local storage
      navigate("/home"); //this is using the useNavigae to take us home
    } catch (error) {
      alert("Error logging in.");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
