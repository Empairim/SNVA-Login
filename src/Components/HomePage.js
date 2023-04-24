import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice"; // Import the logout action from the authSlice

const HomePage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // This hook allows you to dispatch actions to the Redux store

  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);

    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userEmail = decodedToken.email.split("@")[0];
        setEmail(userEmail);
      } catch (err) {
        //this is how I cut off the @and .com lets gooooo
        console.error("Invalid token", err); //Ill have to figure out why the token isnt working another time bleh -_-
      }
    }
  }, []);

  // This function handles the logout process
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from local storage for safety
    dispatch(logout()); // Dispatch the logout action from authSlice
    navigate("/login"); // Navigate the user back to the login page
  };

  return (
    <div>
      <h1>Welcome to the Home Page, {email}!</h1>
      {/* Add a logout button with the handleLogout function as the onClick event handler */}
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
