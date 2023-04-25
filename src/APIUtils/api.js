import axios from "axios";

const API_BASE_URL = "http://localhost:8077";

//FETHCING DATA API
export const fetchUserData = async (token) => {
  if (token) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/apiprofile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};

//LOGIN API

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/authenticate`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// REGISTER API

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/user/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
  }
};
