import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "./useAuth.js";

function App() {
  //now this custom hook can be used to get the isAuthenticated value
  const isAuthenticated = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigation to="/home" /> : <Login />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigation to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
