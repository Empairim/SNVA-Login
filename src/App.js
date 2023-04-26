// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";
import MainLayout from "./Components/MainLayout"; // Import the MainLayout component
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "./useAuth.js";

function App() {
  // Now this custom hook can be used to get the isAuthenticated value
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes with MainLayout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainLayout>
                {/* Add all routes that should have the NavBar here */}
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </MainLayout>
            ) : (
              // Redirect to the login page if the user is not authenticated
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
