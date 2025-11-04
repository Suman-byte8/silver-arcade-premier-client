import axios from 'axios';

export const fetchAccommodationDetails = async (bookingId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/reservations/accommodation/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return { data: response.data.data, error: null };
    } else {
      throw new Error(response.data.message || "Failed to fetch booking details");
    }
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Failed to fetch booking details"
    };
  }
};

export const createAccommodationBooking = async (formData, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/reservations/accommodation`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      return { data: response.data.data, error: null };
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('Accommodation booking error:', error.response?.data || error);
    return {
      data: null,
      error: error.response?.data?.message || 'Something went wrong with the booking'
    };
  }
};
