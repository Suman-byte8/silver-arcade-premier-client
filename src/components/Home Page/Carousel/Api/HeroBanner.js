import axios from "axios";
import { cachedFetchHeroBanner } from "../../../utils/apiCache";

export const getHeroBannerData = async (token) => {
  try {
    // Try cached version first
    const cachedData = await cachedFetchHeroBanner();
    if (cachedData) {
      return { data: cachedData, error: null };
    }

    // Fallback to API call with auth
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/content/home/hero-banner`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    if (response.data.success) {
      return { data: response.data.heroBanners, error: null };
    } else {
      throw new Error(response.data.message || "Failed to fetch hero banner data");
    }
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch hero banner data"
    };
  }
};
