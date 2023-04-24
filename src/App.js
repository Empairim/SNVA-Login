import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      {" "}
      {/*this wraps the app and provides routing functionality*/}
      <Routes>
        {" "}
        {/* this switches the routes when you have multiple components grouped together */}
        <Route path="/" element={<Navigation to="/login" />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
