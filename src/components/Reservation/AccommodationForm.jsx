import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast';
import FullLogo from "../FullLogo";
import BookingButton from "../Reservation/BookingButton";
import { DatePicker } from "../Reservation/Accommodation/components/DatePicker";
import { NightsDisplay } from "../Reservation/Accommodation/components/NightsDisplay";
import { RoomSelection } from "../Reservation/Accommodation/components/RoomSelection";
import { GuestInformation } from "../Reservation/Accommodation/components/GuestInformation";
import { createReservation } from "../../services/reservationApi";
import { formatDate } from "../../utils/bookingUtils";
import { UserContext } from "../../context/UserContext";
import LoginModal from "../LoginModal";

// Constants for check-in and check-out times
const CHECK_IN_TIME = "11:00";
const CHECK_OUT_TIME = "09:00";

export default function AccommodationForm({ onSubmit }) {
  const location = useLocation();
  const initialRoomData = location.state?.roomData;
  const preselectRoomType = location.state?.preselectRoomType;

  // State declarations
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  // const [showRoomSelection, setShowRoomSelection] = useState(false); // Commented out old room selection
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { getToken, isAuthenticated } = useContext(UserContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [arrivalDate, setArrivalDate] = useState(today);
  const [departureDate, setDepartureDate] = useState(tomorrow);
  // const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]); // Commented out old rooms state
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(
    preselectRoomType ? [{ type: preselectRoomType, count: 1 }] : (initialRoomData ? [{ type: initialRoomData.roomType, count: 1 }] : [])
  );
  const [totalAdults, setTotalAdults] = useState(initialRoomData?.adults || 1);
  const [totalChildren, setTotalChildren] = useState(initialRoomData?.children || 0);
  const [guestName, setGuestName] = useState("");
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update handlers for total guests
  const handleTotalAdultsChange = (value) => {
    setTotalAdults(Math.max(1, value));
  };

  const handleTotalChildrenChange = (value) => {
    setTotalChildren(Math.max(0, value));
  };

  useEffect(() => {
    if (initialRoomData) {
      setArrivalDate(new Date(initialRoomData.checkIn || today));
      setDepartureDate(new Date(initialRoomData.checkOut || tomorrow));
      // setRooms([{ adults: initialRoomData.adults || 1, children: initialRoomData.children || 0 }]);
    }
  }, [initialRoomData]);

  const handleDateSelect = (date, type) => {
    if (type === "arrival") {
      setArrivalDate(date);
      setShowArrivalCalendar(false);
      // If arrival date is changed to be on or after departure, adjust departure
      const arrivalDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const departureDateOnly = new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate());
      if (arrivalDateOnly >= departureDateOnly) {
        const newDeparture = new Date(date);
        newDeparture.setDate(date.getDate() + 1);
        setDepartureDate(newDeparture);
      }
    } else {
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const arrivalDateOnly = new Date(arrivalDate.getFullYear(), arrivalDate.getMonth(), arrivalDate.getDate());
      if (dateOnly > arrivalDateOnly) {
        setDepartureDate(date);
        setShowDepartureCalendar(false);
      } else {
        toast.error("Departure date must be after the arrival date.");
      }
    }
  };

  // Comment out old room handlers
  /*
  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = rooms.filter((_, i) => i !== index);
      setRooms(updatedRooms);
    }
  };

  const updateCount = (roomIndex, type, delta) => {
    const updatedRooms = [...rooms];
    const newValue = Math.max(0, updatedRooms[roomIndex][type] + delta);
    updatedRooms[roomIndex][type] = newValue;
    setRooms(updatedRooms);
  };
  */

  // New room type handlers
  const handleRoomTypeChange = (index, type, count) => {
    const newRoomTypes = [...selectedRoomTypes];
    if (index >= newRoomTypes.length) {
      newRoomTypes.push({ type, count });
    } else {
      newRoomTypes[index] = { type, count };
    }
    setSelectedRoomTypes(newRoomTypes.filter(room => room.count > 0));
  };

  const addRoomType = () => {
    setSelectedRoomTypes([...selectedRoomTypes, { type: '', count: 1 }]);
  };

  const resetForm = () => {
    setSelectedRoomTypes([]);
    setTotalAdults(1);
    setTotalChildren(0);
    setGuestName('');
    setGuestPhoneNumber('');
    setGuestEmail('');
    setSpecialRequests('');
  };

  // Helper functions for formatting dates with times
  const formatDateWithTime = (date, time) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `${formattedDate} at ${time}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Calculate number of nights
  const calculateNights = () => {
    const diffTime = departureDate.getTime() - arrivalDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
  
    try {
      setIsLoading(true);
  
      // Form validation
      if (!guestName || !guestPhoneNumber || !guestEmail) {
        toast.error('Please fill in all guest information');
        setIsLoading(false);
        return;
      }
  
      if (selectedRoomTypes.length === 0 || selectedRoomTypes.some(room => !room.type)) {
        toast.error('Please select room types for all rooms');
        setIsLoading(false);
        return;
      }
  
      if (totalAdults < 1) {
        toast.error('At least one adult is required');
        setIsLoading(false);
        return;
      }
  
      // Calculate nights
      const nights = calculateNights();
      if (nights < 1) {
        toast.error('Check-out date must be after check-in date');
        setIsLoading(false);
        return;
      }
  
      const formData = {
        typeOfReservation: 'accommodation',
        arrivalDate: arrivalDate.toISOString(),
        departureDate: departureDate.toISOString(),
        checkInTime: CHECK_IN_TIME,
        checkOutTime: CHECK_OUT_TIME,
        nights,
        selectedRoomTypes: selectedRoomTypes.map(room => ({
          type: room.type,
          count: Math.max(1, room.count)
        })),
        totalAdults: Math.max(1, totalAdults),
        totalChildren: Math.max(0, totalChildren),
        specialRequests: specialRequests || '',
        guestInfo: {
          name: guestName.trim(),
          phoneNumber: guestPhoneNumber.trim(),
          email: guestEmail.trim().toLowerCase()
        }
      };
  
      console.log('Submitting accommodation booking:', formData);
  
      const token = getToken();
      const { data, error } = await createReservation("accommodation", formData, token);
  
      if (error) {
        console.error('Booking error:', error);
        toast.error(error);
        setIsLoading(false);
        return;
      }
  
      toast.success('Booking successful!');
  
      // Call onSubmit with the booking data for navigation
      onSubmit({
        ...data,
        bookingId: data._id
      });
  
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong with the booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <FullLogo text={"xs"} />

      {/* Date Selection */}
      <div className="flex flex-col md:flex-row gap-6 mb-6 mt-4">
        <DatePicker
          label="ARRIVAL"
          selectedDate={arrivalDate}
          showCalendar={showArrivalCalendar}
          onToggleCalendar={() => {
            setShowArrivalCalendar(!showArrivalCalendar);
            setShowDepartureCalendar(false);
          }}
          onDateSelect={(date) => handleDateSelect(date, "arrival")}
          minDate={today}
          formatDate={(date) => date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <DatePicker
          label="DEPARTURE"
          selectedDate={departureDate}
          showCalendar={showDepartureCalendar}
          onToggleCalendar={() => {
            setShowDepartureCalendar(!showDepartureCalendar);
            setShowArrivalCalendar(false);
          }}
          onDateSelect={(date) => handleDateSelect(date, "departure")}
          minDate={new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000)}
          formatDate={(date) => date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </div>

      {/* Time Information */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Check-in time is 11:00 AM, and check-out time is 9:00 AM.
        </p>
      </div>

      <NightsDisplay nights={calculateNights()} />

      {/* Room Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ROOM TYPES
        </label>
        <div className="space-y-4">
          {selectedRoomTypes.map((room, index) => (
            <div key={index} className="flex items-center gap-4">
              <select
                value={room.type}
                onChange={(e) => handleRoomTypeChange(index, e.target.value, room.count)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Room Type</option>
                <option value="Standard">Standard Room</option>
                <option value="Deluxe">Deluxe Room</option>
                <option value="Suite">Suite</option>
                <option value="Family">Family Room</option>
              </select>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRoomTypeChange(index, room.type, room.count - 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span className="w-8 text-center">{room.count}</span>
                <button
                  type="button"
                  onClick={() => handleRoomTypeChange(index, room.type, room.count + 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoomType}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            + Add Another Room Type
          </button>
        </div>
      </div>

      {/* Total Guests Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          TOTAL GUESTS
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-600">Adults</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => handleTotalAdultsChange(totalAdults - 1)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                -
              </button>
              <span className="w-8 text-center">{totalAdults}</span>
              <button
                type="button"
                onClick={() => handleTotalAdultsChange(totalAdults + 1)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-600">Children</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => handleTotalChildrenChange(totalChildren - 1)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                -
              </button>
              <span className="w-8 text-center">{totalChildren}</span>
              <button
                type="button"
                onClick={() => handleTotalChildrenChange(totalChildren + 1)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SPECIAL REQUESTS
        </label>
        <div className="flex items-start border border-gray-300 rounded-lg px-3 py-3">
          <svg
            className="text-gray-500 mr-2 mt-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <textarea
            placeholder="Please share any special requests (optional)"
            className="flex-1 outline-none resize-none bg-transparent"
            rows={3}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
      </div>

      <GuestInformation
        guestName={guestName}
        guestPhoneNumber={guestPhoneNumber}
        guestEmail={guestEmail}
        onGuestNameChange={(e) => setGuestName(e.target.value)}
        onPhoneNumberChange={(e) => setGuestPhoneNumber(e.target.value)}
        onEmailChange={(e) => setGuestEmail(e.target.value)}
      />

      <BookingButton text={"Book"} onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
