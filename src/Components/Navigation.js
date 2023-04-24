import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/login">Login</Link>
      {" | "}
      <Link to="/signup">Register</Link>
    </nav>
  );
};

export default Navigation;
