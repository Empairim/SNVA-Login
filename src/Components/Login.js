import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  "http://ip172-19-0-29-ch3a122e69v000epu0d0-8077.direct.labs.play-with-docker.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

export default Login;
