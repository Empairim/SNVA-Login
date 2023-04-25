import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice";
import { fetchUserData } from "../APIUtils/api";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);

    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      const userData = await fetchUserData(token);
      if (userData && userData.email) {
        const userEmail = userData.email.split("@")[0];
        setEmail(userEmail);
        setProfileImage(
          userData.profilePicture ||
            "https://www.shutterstock.com/image-vector/simple-design-ryomen-sukuna-face-600w-2090638435.jpg"
        );
      } else {
        console.error("Email is not available in the response data");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Random Web Name 🤪</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={
                profileImage ? (
                  <Image
                    src={profileImage}
                    alt="profile"
                    width={30}
                    height={30}
                    roundedCircle
                  />
                ) : (
                  <div className="default-profile-image" />
                )
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>Welcome, {email}!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomePage;
