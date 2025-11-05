import { cachedFetchCuratedOffers } from "../utils/apiCache";

// Fetch curated offers (public endpoint - no auth required)
export const fetchCuratedOffers = async () => {
  const data = await cachedFetchCuratedOffers();
  console.log("Fetched offers data:", data); // Log the response data
  return data;
};
