import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BookingHistory from "./components/BookingHistory";
import UserProfile from "./components/UserProfile";
import Home from "./pages/client/Home";
import LoRek from "./pages/LoRek";
import Booking from "./pages/client/Booking";
import UserDashboard from "./pages/client/UserDashboard";
import Feedback from "./pages/client/FeedBack";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  const location = useLocation();
  // Rute tanpa Navbar/Footer
  const noNavbarRoutes = ["/", "/admin-dashboard"];
  const noFooterRoutes = ["/", "/admin-dashboard"];

  const hideNavbar = noNavbarRoutes.includes(location.pathname);
  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? 'pt-20' : ''}>
        <Routes>
          <Route path="/" element={<LoRek />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default App