import axios from "axios";
import { cachedFetchAboutPage } from "../utils/apiCache";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Fetch About page content (now using cache)
export const fetchAboutPage = async (token) => {
  try {
    const data = await cachedFetchAboutPage();
    console.log("Fetched About page data:", data); // Log the response data
    return data;
  } catch (error) {
    console.error("Error fetching about page:", error);
    throw error;
  }
};

// Delete Amenity
export const deleteAmenity = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/content/about/admin/amenities/${id}`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting amenity:", error);
    throw error;
  }
};
