import React from "react";
import { FaCalendarAlt, FaBed, FaUser, FaBuilding, FaUtensils, FaInfoCircle } from "react-icons/fa";
import { formatDate, formatTime } from "../../utils/bookingUtils";

const AccommodationDetails = ({ booking }) => (
  <div className="font-helvetica-neue text-gray-700">
    <div className="flex items-center gap-3 mb-2">
      <FaCalendarAlt className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Check-in</p>
        <p className="font-medium">{formatDate(booking.arrivalDate)}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaCalendarAlt className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Check-out</p>
        <p className="font-medium">{formatDate(booking.departureDate)}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaBed className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Rooms and Guests</p>
        <p className="font-medium">
          {booking.rooms.length} Room(s), {booking.totalAdults} Adult(s)
          {booking.totalChildren > 0 && `, ${booking.totalChildren} Children`}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaCalendarAlt className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Number of Nights</p>
        <p className="font-medium">{booking.nights} Night(s)</p>
      </div>
    </div>
  </div>
);

const MeetingDetails = ({ bookingData }) => (
  <>
    <div className="flex items-center gap-3 mb-2">
      <FaBuilding className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Event Type</p>
        <p className="font-medium">{bookingData.typeOfReservation}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaCalendarAlt className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Event Duration</p>
        <p className="font-medium">
          {formatDate(bookingData.reservationDate)} - {formatDate(bookingData.reservationEndDate)}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaUser className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Number of Guests</p>
        <p className="font-medium">{bookingData.numberOfGuests} Guests</p>
      </div>
    </div>
    {bookingData.numberOfRooms > 0 && (
      <div className="flex items-center gap-3">
        <FaBed className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Rooms Required</p>
          <p className="font-medium">{bookingData.numberOfRooms} Room(s)</p>
        </div>
      </div>
    )}
  </>
);

const RestaurantDetails = ({ bookingData }) => (
  <>
    <div className="flex items-center gap-3 mb-2">
      <FaCalendarAlt className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Date</p>
        <p className="font-medium">{formatDate(bookingData.date)}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaUtensils className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Time Slot</p>
        <p className="font-medium capitalize">{bookingData.timeSlot}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 mb-2">
      <FaUser className="text-gray-500" />
      <div>
        <p className="text-sm text-gray-600">Number of Diners</p>
        <p className="font-medium">{bookingData.noOfDiners} Person(s)</p>
      </div>
    </div>
    {bookingData.specialRequests && (
      <div className="flex items-center gap-3">
        <FaInfoCircle className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-600">Special Requests</p>
          <p className="font-medium">{bookingData.specialRequests}</p>
        </div>
      </div>
    )}
  </>
);

const BookingDetails = ({ booking, bookingData, bookingType }) => {
  const renderDetails = () => {
    switch (bookingType) {
      case "accommodation":
        return <AccommodationDetails booking={booking} />;
      case "meeting":
        return <MeetingDetails bookingData={bookingData} />;
      case "restaurant":
        return <RestaurantDetails bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h2 className="text-lg font-normal mb-4">Booking Details</h2>
      {renderDetails()}
    </div>
  );
};

export default BookingDetails;
