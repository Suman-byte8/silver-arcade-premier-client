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
    // For individual room, we might want to fetch from cache or API
    // For simplicity, using cached rooms and filtering
    const rooms = await cachedFetchRooms();
    const room = rooms.find(r => r.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
};
