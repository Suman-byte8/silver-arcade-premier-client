import { cachedFetchRooms } from "../utils/apiCache";

export const getRooms = async (token) => {
  try {
    // For authenticated requests, we might want to bypass cache or use a different key
    // For now, using cached version for public data
    const rooms = await cachedFetchRooms();
    return rooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const getRoomById = async (roomId, token) => {
  try {
    // Try cached collection first
    const rooms = await cachedFetchRooms();
    const roomFromCache = rooms.find((room) => room._id === roomId || room.id === roomId);
    if (roomFromCache) {
      return roomFromCache;
    }

    // Fallback to direct API call when cache miss occurs
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rooms/get-room/${roomId}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`
          }
        : undefined
    });

    if (!response.ok) {
      throw new Error('Room not found');
    }

    const result = await response.json();
    return result.room;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};
