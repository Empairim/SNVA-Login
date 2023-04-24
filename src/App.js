import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  "http://ip172-19-0-7-ch3a122e69v000epu0d0-8077.direct.labs.play-with-docker.com"; // I THINK this is the correct base url

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/signup`, { email, password });
      alert("User Registered Successfully");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/authenticate`, {
        email,
        password,
      });
      const token = response.data.token;
      console.log("Token:", token);
      alert("Logged in successfully.");
    } catch (error) {
      alert("Error logging in.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <Router>
      {" "}
      {/*this wraps the app and provides routing functionality*/}
      <Routes>
        {" "}
        {/* this switches the routes when you have multiple components grouped together */}
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
