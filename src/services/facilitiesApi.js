import { cachedFetchFacilities } from "../utils/apiCache";

export const fetchFacilities = async () => {
  try {
    const data = await cachedFetchFacilities();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.message || "Error fetching facilities"
    };
  }
};
