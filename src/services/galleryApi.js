import { cachedFetchGallery } from "../utils/apiCache";

export const fetchGalleryImages = async (tab) => {
  try {
    const data = await cachedFetchGallery();
    // Filter by tab if provided
    if (tab) {
      return data.filter(item => item.category === tab);
    }
    return data;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
};
