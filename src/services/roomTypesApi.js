import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getRoomTypes = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/rooms/get-rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const rooms = response.data.rooms;

    // Process rooms to get unique room types with availability
    const roomTypeMap = {};
    rooms.forEach(room => {
      const type = room.roomType;
      if (!roomTypeMap[type]) {
        roomTypeMap[type] = { available: false, status: 'Not Available' };
      }
      if (room.roomStatus === 'available') {
        roomTypeMap[type].available = true;
        roomTypeMap[type].status = 'Available';
      }
    });

    // Convert to array
    const roomTypes = Object.keys(roomTypeMap).map(type => ({
      type,
      available: roomTypeMap[type].available,
      status: roomTypeMap[type].status
    }));

    return roomTypes;
  } catch (error) {
    console.error('Error fetching room types:', error);
    throw error;
  }
};
