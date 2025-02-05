import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCollegesByquery = async (value) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/courses/search?query=${encodeURIComponent(
        value
      )}&limit=10`
    );
    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};
export const fetchCollegesFilter = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/courses`
    );
    return response.data;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    throw error;
  }
};
