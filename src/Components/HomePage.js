import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice";
import { fetchUserData } from "../api";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);

    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      const userData = await fetchUserData(token);
      if (userData && userData.email) {
        const userEmail = userData.email.split("@")[0];
        setEmail(userEmail);
      } else {
        console.error("Email is not available in the response data");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Random Site Name :p</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={<img src="path/to/profile-image.jpg" />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>Welcome, {email}!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HomePage;
