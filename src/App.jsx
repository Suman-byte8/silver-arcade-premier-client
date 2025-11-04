import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import OurRooms from "./pages/OurRooms";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import OurFacilities from "./pages/Facilities";
import OfferPage from "./pages/OfferPage";
import ReservationPage from "./pages/ReservationPage";
import OurHeartMalda from "./pages/HeartMalda";
import Membership from "./pages/Membership";
import BookingConfirmation from "./pages/BookingConfirmation";
import GalleryPage from "./pages/GalleryPage";
import PrivacyPolicyPage from "./pages/Privacy Policy/PrivacyPolicyPage";
import TermsOfService from "./pages/Privacy Policy/TermsOfService";
import RoomViewPage from "./pages/RoomViewPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import MeetingPage from "./pages/SemiNavlinksPages/MeetingPage";
import WeddingPage from "./pages/SemiNavlinksPages/WeddingPage";
import SleepBoutique from "./pages/SemiNavlinksPages/SleepBoutique";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingButtons from "./components/FloatingButtons";

const AppContent = () => {
  return (
    <div className="font-helvetica-neue">
      <Navbar />
      <FloatingButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-facilities" element={<OurFacilities />} />
        <Route path="/our-offers" element={<OfferPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/heart-malda" element={<OurHeartMalda />} />
        <Route path="/membership-area" element={<Membership />} />

        {/* Protected Routes */}
        <Route
          path="/booking-confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/our-rooms" element={<OurRooms />} />
        <Route path="/our-rooms/room-tour/:id" element={<RoomViewPage />} />
        <Route path="/banquet-page" element={<MeetingPage />} />
        <Route path="/wedding-page" element={<WeddingPage />} />
        <Route path="/sleep-boutique" element={<SleepBoutique />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

export default App;
