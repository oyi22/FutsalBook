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

// ADMIN
import NavbarAdmin from "./components/NavbarAdmin";
import AdmDashboard from "./pages/admin/AdmDashboard";
import AdmBooking from "./pages/admin/AdmBooking";
import AdmLapangan from "./pages/admin/AdmLapangan";
import AdmUser from "./pages/admin/AdmUser";
import AdmLaporan from "./pages/admin/AdmLaporan";


const App = () => {
  const location = useLocation();

  // Deteksi halaman admin
  const isAdminRoute = [
    "/adm-dashboard",
    "/adm-booking",
    "/adm-lapangan",
    "/adm-user",
    "/adm-laporan"
  ].includes(location.pathname);

  // Halaman tanpa Navbar/Footer user
  const hideNavbar = isAdminRoute || location.pathname === "/";
  const hideFooter = isAdminRoute || location.pathname === "/";

  return (
    <>
      {/* TAMPILKAN NAVBAR USER ATAU NAVBAR ADMIN */}
      {!hideNavbar && <Navbar />}
      {isAdminRoute && <NavbarAdmin />}

      {/* ISI HALAMAN */}
      <div className={`min-h-screen transition-all duration-300 ${isAdminRoute ? 'pl-64' : (hideNavbar ? '' : 'pt-20')}`}>
        <Routes>
          {/* CLIENT */}
          <Route path="/" element={<LoRek />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/user-profile" element={<UserProfile />} />

          {/* ADMIN */}
          <Route path="/adm-dashboard" element={<AdmDashboard />} />
          <Route path="/adm-booking" element={<AdmBooking />} />
          <Route path="/adm-lapangan" element={<AdmLapangan />} />
          <Route path="/adm-user" element={<AdmUser/>} />
          <Route path="/adm-laporan" element={<AdmLaporan/>} />
        </Routes>
      </div>

      {/* FOOTER USER */}
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
