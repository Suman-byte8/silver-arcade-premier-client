import { cachedFetchDistinctives } from "../utils/apiCache";

// READ
export const fetchDistinctives = async () => {
  return await cachedFetchDistinctives();
};
