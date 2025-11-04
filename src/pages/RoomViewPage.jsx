import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getRoomById } from "../services/roomsApi";
import { socket } from "../socket";
import RoomHero from "../components/RoomViewPage/RoomHero";
import RoomGallery from "../components/RoomViewPage/RoomGallery";
import RoomDescription from "../components/RoomViewPage/RoomDescription";
import ExploreOtherRooms from "../components/RoomViewPage/ExploreOtherRooms";

const RoomViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(UserContext);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRoom = async () => {
      try {
        const token = getToken();
        const data = await getRoomById(id, token);
        setRoom(data);
      } catch {
        setError("Failed to fetch room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id, getToken]);



  const handleBookNow = () => {
    navigate('/reservation', {
      state: {
        roomData: {
          roomType: room.roomType,
          checkIn: new Date().toISOString(),
          checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          adults: 1,
          children: 0
        },
        preselectRoomType: room.roomType
      }
    });
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!room) return <p className="text-gray-500 text-center">No room found.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <RoomHero heroImage={room.heroImage} roomName={room.roomName} />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <RoomGallery roomImages={room.roomImages} />
            <RoomDescription
              roomDescription={room.roomDescription}
              roomCapacity={room.roomCapacity}
              roomType={room.roomType}
              roomPrice={room.roomPrice}
              roomStatus={room.roomStatus}
            />
          </div>
          <div className="lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Room Details</h3>
              <p className="text-gray-600 mb-6">
                Experience comfort in our {room.roomType} room. This room can accommodate up to {room.roomCapacity} {room.roomCapacity > 1 ? 'persons' : 'person'}.
              </p>
              <div className="text-2xl font-bold mb-6">₹{room.roomPrice}<span className="text-base font-normal text-gray-600">/night</span></div>
              {room.roomStatus === 'available' ? (
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-4 rounded-md text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              ) : (
                <div>
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-md text-lg font-medium bg-gray-300 cursor-not-allowed text-gray-600"
                  >
                    {room.roomStatus === 'booked' ? 'Room Not Available' : 'Under Maintenance'}
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {room.roomStatus === 'booked'
                      ? 'This room is currently booked. Please check back later or choose another room.'
                      : 'This room is currently under maintenance. Please check back later.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <ExploreOtherRooms currentRoomId={room._id} />
      </div>
    </div>
  );
};

export default RoomViewPage;