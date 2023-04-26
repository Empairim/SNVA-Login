import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../authSlice";
import { fetchUserData } from "../APIUtils/api";

// Add this selector to check if the user is authenticated
const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

const NavBar = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get isAuthenticated from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // This effect handles fetching user data and setting email and profile image
  useEffect(() => {
    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    };
    confetti(confettiSettings);

    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  // This function handles user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  };

  // These functions handle navigation using useNavigate
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          className="me-auto"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Random Web Name 🤪
        </Navbar.Brand>
        <Nav className="d-flex align-items-center">
          {isAuthenticated ? (
            loading ? (
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
                  <NavDropdown.Item onClick={handleProfileClick}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )
          ) : (
            // Unauthenticated users will see these Nav.Links
            <>
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
              <Nav.Link onClick={handleSignupClick}>Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
