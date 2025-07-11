import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Data Lapangan
const FIELDS = [
  { id: 1, name: "Lapangan Premium A" },
  { id: 2, name: "Lapangan Standard B" },
  { id: 3, name: "Lapangan VIP Elite" }
];

// Ambil data booking dari localStorage
const getBookings = () => JSON.parse(localStorage.getItem("bookings") || "[]");

export default function AdmLapangan() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = getBookings();
    setBookings(stored);
  }, []);

  const isFieldBooked = (fieldName) => {
    return bookings.some(b => b.lapangan === fieldName && b.status === "Aktif");
  };

  const handleCreate = (fieldId) => {
    navigate("/booking", { state: { fieldId } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Kontrol Lapangan & Reservasi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {FIELDS.map((field) => {
          const booked = isFieldBooked(field.name);

          return (
            <div
              key={field.id}
              className="bg-white p-4 rounded-xl border shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg mb-2">{field.name}</h2>
              <p className={`mb-4 text-sm ${booked ? "text-red-600" : "text-emerald-600"}`}>
                Status: {booked ? "Sudah dibooking" : "Tersedia"}
              </p>
              <button
                onClick={() => handleCreate(field.id)}
                disabled={booked}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
                  booked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <FiPlus /> Booking Baru
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
