import React from "react";
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>
          <h1>Welcome to my App</h1>
          <p>Here's some content for the homepage.</p>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
