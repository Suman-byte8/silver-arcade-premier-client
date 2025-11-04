import React from "react";
import { FaWifi, FaTv, FaAirFreshener } from "react-icons/fa";
import { MdOutlineWineBar, MdOutlineRoomService } from "react-icons/md";

const RoomDescription = ({ roomDescription, roomCapacity, roomType, roomPrice, roomStatus }) => {
  const amenities = [
    { icon: <FaWifi />, label: "Complimentary Wi-Fi" },
    { icon: <FaTv />, label: "Flat-Screen TV" },
    { icon: <FaAirFreshener />, label: "Air Conditioning" },
    { icon: <MdOutlineWineBar />, label: "Mini Bar" },
    { icon: <MdOutlineRoomService />, label: "24/7 Room Service" },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Room Details</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(roomStatus)}`}>
          {roomStatus || 'Unknown'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-600 mb-6">
        <div>
          <span className="font-medium">Type:</span> {roomType}
        </div>
        <div>
          <span className="font-medium">Capacity:</span> {roomCapacity} {roomCapacity > 1 ? 'persons' : 'person'}
        </div>
        <div className="col-span-2">
          <span className="font-medium">Price:</span> ₹{roomPrice}/night
        </div>
      </div>

      <div className="prose max-w-none mb-6">
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-gray-600">{roomDescription}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {amenities.map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
          >
            <div className="text-blue-600 text-lg">{a.icon}</div>
            <span className="text-gray-800">{a.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomDescription;