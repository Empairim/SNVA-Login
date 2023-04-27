import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fetchUserData } from "../APIUtils/api";

const selectToken = (state) => state.auth.token;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData(token);
      setUserData(data);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Container
      className="py-4 d-flex justify-content-center"
      style={{ marginTop: "4rem" }}
    >
      <Card
        style={{ width: "50%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <Card.Body>
          <Card.Title>Profile Information</Card.Title>
          {userData && (
            <div>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
              <p>Address: {userData.address}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
