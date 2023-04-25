import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios to make API requests
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice";

const API_BASE_URL = "http://localhost:8077"; // Add the base URL for your API

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
          // Add a conditional check before attempting to split the email
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
    //

    fetchUserData(); // Call the function to fetch user data
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Home Page, {email}!</h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
