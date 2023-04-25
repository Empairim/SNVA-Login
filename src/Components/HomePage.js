import React, { useEffect, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice";

const API_BASE_URL = "http://localhost:8077";

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

    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/user/apiprofile`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data && response.data.email) {
            const userEmail = response.data.email.split("@")[0];
            setEmail(userEmail);
          } else {
            console.error("Email is not available in the response data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>
                <h1>Welcome, {email}!</h1>
              </Card.Title>
              <Card.Text>
                You've successfully logged in to the application.
              </Card.Text>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
