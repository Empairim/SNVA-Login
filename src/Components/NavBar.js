import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../authSlice";
import { fetchUserData } from "../APIUtils/api";

const NavBar = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);

    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      try {
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
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
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
        <Navbar.Brand className="me-auto" href="#">
          Random Web Name 🤪
        </Navbar.Brand>
        <Nav className="d-flex align-items-center">
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <Nav.Link className="me-3">Welcome, {email}!</Nav.Link>
              <Image
                src={profileImage}
                alt="profile"
                width={30}
                height={30}
                roundedCircle
                className="me-3"
              />
              <NavDropdown title="" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
