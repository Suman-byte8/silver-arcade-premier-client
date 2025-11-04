import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { createRoomBooking } from "../../services/reservationApi";
import { toast } from "react-hot-toast";

const RoomBookingForm = ({ room }) => {
  const { user, getToken } = useContext(UserContext);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    specialRequests: "",
  });

  const isRoomAvailable = room.roomStatus === 'available';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a room");
      return;
    }

    if (!isRoomAvailable) {
      toast.error("This room is not available for booking");
      return;
    }

    const token = getToken();
    const { data, error } = await createRoomBooking({
      room: room._id,
      ...bookingData,
      totalPrice: room.roomPrice * calculateNights(bookingData.checkIn, bookingData.checkOut),
    }, token);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Room booked successfully!");
      setBookingData({
        checkIn: "",
        checkOut: "",
        numberOfGuests: 1,
        specialRequests: "",
      });
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleChange = (e) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isRoomAvailable) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="text-red-600 text-xl font-semibold mb-2">Room Currently Unavailable</div>
          <p className="text-gray-600">This room is currently {room.roomStatus}. Please check back later or explore our other rooms.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Book This Room</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={bookingData.checkIn}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-700">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={bookingData.checkOut}
            onChange={handleChange}
            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-700">Number of Guests</label>
          <input
            type="number"
            name="numberOfGuests"
            value={bookingData.numberOfGuests}
            onChange={handleChange}
            min="1"
            max={room.roomCapacity || 2}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-700">Special Requests</label>
          <textarea
            name="specialRequests"
            value={bookingData.specialRequests}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          ></textarea>
        </div>
        {bookingData.checkIn && bookingData.checkOut && (
          <div className="text-lg font-semibold">
            Total Price: ₹{room.roomPrice * calculateNights(bookingData.checkIn, bookingData.checkOut)}
            <span className="text-sm font-normal"> ({calculateNights(bookingData.checkIn, bookingData.checkOut)} nights)</span>
          </div>
        )}
        <button
          type="submit"
          disabled={!user || !isRoomAvailable}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!user ? "Login to Book" : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default RoomBookingForm;