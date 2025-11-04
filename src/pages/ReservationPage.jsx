import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AuthModal from "../components/AuthModal";
import AccommodationForm from "../components/Reservation/AccommodationForm";
import RestaurantReservationForm from "../components/Reservation/RestaurantReservationForm";
import MeetingWeddingForm from "../components/Reservation/MeetingWeddingForm";
import InfoPanel from "../components/Reservation/InfoPanel";
import ReservationSidebar from "../components/Reservation/ReservationSidebar";

export default function ReservationPage() {
  const { isAuthenticated } = useContext(UserContext);
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [activeSection, setActiveSection] = useState("accommodation");
  const navigate = useNavigate();

  useEffect(() => {
    setShowAuthModal(!isAuthenticated);
  }, [isAuthenticated]);

  const handleBookingSubmit = async (formData) => {
    try {
      // Navigate immediately to booking confirmation with the booking data
      // The actual API call will be handled by the individual form components
      navigate('/booking-confirmation', { state: { bookingData: formData } });
    } catch (error) {
      console.error('Booking submission error:', error);
      // Handle error - could show error message
    }
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "accommodation":
        return <AccommodationForm onSubmit={handleBookingSubmit} />;
      case "restaurant":
        return <RestaurantReservationForm onSubmit={handleBookingSubmit} />;
      case "meeting":
        return <MeetingWeddingForm onSubmit={handleBookingSubmit} />;
      default:
        return <AccommodationForm onSubmit={handleBookingSubmit} />;
    }
  };

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        loginOnly={true}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <ReservationSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="flex-1">
              {renderActiveForm()}
            </div>

            {/* Right Information Panel */}
            <InfoPanel />
          </div>
        </div>
      </div>
    </>
  );
}

