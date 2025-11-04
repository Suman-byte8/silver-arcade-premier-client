import React, { useState,useContext } from "react";
import { toast } from 'react-hot-toast';
import FullLogo from "../FullLogo";
import BookingButton from "../Reservation/BookingButton";
import { DatePicker } from "../Reservation/Accommodation/components/DatePicker";
import { NightsDisplay } from "../Reservation/Accommodation/components/NightsDisplay";
import { RoomSelection } from "../Reservation/Accommodation/components/RoomSelection";
import { GuestInformation } from "../Reservation/Accommodation/components/GuestInformation";
import { createReservation } from "../../services/reservationApi";
import { formatDate } from "../../utils/bookingUtils";
import {UserContext} from "../../context/UserContext";
import LoginModal from "../LoginModal";

// Constants for check-in and check-out times
const CHECK_IN_TIME = "11:00";
const CHECK_OUT_TIME = "09:00";

export default function AccommodationForm({ onSubmit }) {
  // State declarations
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

const {getToken, isAuthenticated} = useContext(UserContext)


  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [arrivalDate, setArrivalDate] = useState(today);
  const [departureDate, setDepartureDate] = useState(tomorrow);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [guestName, setGuestName] = useState("");
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const getTotalAdults = () =>
    rooms.reduce((sum, room) => sum + room.adults, 0);
  const getTotalChildren = () =>
    rooms.reduce((sum, room) => sum + room.children, 0);

  const resetForm = () => {
    setRooms([{ adults: 1, children: 0 }]);
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
    // Check if user is authenticated
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

      const formData = {
        typeOfReservation: 'accommodation',
        arrivalDate: arrivalDate.toISOString(),
        departureDate: departureDate.toISOString(),
        checkInTime: CHECK_IN_TIME,
        checkOutTime: CHECK_OUT_TIME,
        nights: calculateNights(),
        rooms: rooms,
        totalAdults: getTotalAdults(),
        totalChildren: getTotalChildren(),
        specialRequests: specialRequests,
        guestInfo: {
          name: guestName,
          phoneNumber: guestPhoneNumber,
          email: guestEmail
        }
      };

      const token = getToken();
      const { data, error } = await createReservation("accommodation", formData, token);

      if (error) {
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

      <RoomSelection
        rooms={rooms}
        showRoomSelection={showRoomSelection}
        onToggleRoomSelection={() => setShowRoomSelection(!showRoomSelection)}
        onUpdateCount={updateCount}
        onAddRoom={addRoom}
        onRemoveRoom={removeRoom}
        getTotalAdults={getTotalAdults}
        getTotalChildren={getTotalChildren}
      />

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
