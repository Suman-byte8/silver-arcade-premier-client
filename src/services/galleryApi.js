import { cachedFetchGallery } from "../utils/apiCache";

export const fetchGalleryImages = async (tab) => {
  try {
    const data = await cachedFetchGallery();
    // Filter by tab if provided - use 'tab' field instead of 'category'
    if (tab) {
      return data.filter(item => item.tab === tab);
    }
    return data;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
};
