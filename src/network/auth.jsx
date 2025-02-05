import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (
  name,
  email,
  phone,
  stream,
  level,
  password
) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      name,
      email,
      phone,
      stream,
      level,
      password,
    });
    return response.data; // Return response from signup API
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to request OTP
export const requestOTP = async (phone) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
      phone,
    });
    return response.data; // OTP Sent
  } catch (error) {
    console.error("OTP Request Error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to verify OTP and login
export const verifyOTP = async (phone, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
      phone,
      otp,
    });
    return response.data; // OTP Verified and User Logged In
  } catch (error) {
    console.error(
      "OTP Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
