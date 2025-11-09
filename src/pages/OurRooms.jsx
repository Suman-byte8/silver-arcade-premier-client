import React, { useState, useEffect, useContext } from "react";
import RoomCard from "../components/Our Rooms/RoomCard";
import AddInfo from "../components/Our Rooms/AddInfo";
import { CiSearch } from "react-icons/ci";
import { UserContext } from "../context/UserContext";
import { getRooms } from "../services/roomsApi";
import Loader from "../components/Loader";

import defaultRoomImg from "../assets/Rooms/deluxe.jpg";

const OurRooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getToken } = useContext(UserContext);

  useEffect(() => {
    const token = getToken();
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms(token);

        // Map API → card-friendly fields
        const transformed = roomsData.map((room) => ({
          ...room,
          name: room.roomName,
          description: room.roomDescription,
          image:
            room.heroImage ||
            (room.roomImages && room.roomImages.length > 0
              ? room.roomImages[0].url
              : defaultRoomImg),
        }));
        setRooms(transformed);
      } catch (err) {
        setError("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [getToken]);

  // Filtering logic
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || room.roomType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Title */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          Find Your Perfect Stay
        </h1>
        <p className="text-gray-600 mt-2">
          Browse & book the best rooms in Malda
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full sm:max-w-md bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <CiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none px-2 bg-transparent text-gray-700"
          />
        </div>

        {/* Filter Select */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="Deluxe Room">Deluxe</option>
          <option value="Executive Deluxe Room">Executive Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Family Suite">Family Suite</option>
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Available Rooms
        </h2>

        {loading ? (
          <div className="w-full flex items-center justify-center py-10">
            <Loader text="Loading rooms..." />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredRooms.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room, idx) => (
              <RoomCard key={idx} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg font-medium">No rooms found</p>
            <p className="text-sm">Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <AddInfo />
    </div>
  );
};

export default OurRooms;