// App.js
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
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "./useAuth.js";
import MainLayout from "./Components/MainLayout"; // Import MainLayout component
import "./App.css";

function App() {
  // Now this custom hook can be used to get the isAuthenticated value
  const isAuthenticated = useAuth();

  return (
    <Router>
      <MainLayout>
        {/* MainLayout component wraps the Routes, it includes NavBar and Footer */}
        <Routes>
          {/* Define the routes for the app */}
          {/* If the user is authenticated, redirect to the home page; otherwise, display the HomePage component */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <HomePage />}
          />
          {/* Route for the signup page */}
          <Route path="/signup" element={<Register />} />
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for the profile page; if the user is not authenticated, redirect to the login page */}
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          {/* Route for the home page; if the user is not authenticated, redirect to the login page */}
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
