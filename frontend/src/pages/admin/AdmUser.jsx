import React, { useEffect, useState } from "react";
import { User, Mail, Phone } from "lucide-react";

export default function AdmUser() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const uniqueUsers = Array.from(
    new Map(bookings.map(b => [b.email, b])).values()
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">Data Pengguna</h1>

      {uniqueUsers.length === 0 ? (
        <p className="text-gray-500">Belum ada data pengguna.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueUsers.map((user, idx) => (
            <div key={idx} className="p-4 border rounded-xl shadow bg-emerald-50">
              <h2 className="text-lg font-bold text-emerald-700 flex items-center gap-2 mb-2">
                <User className="w-4 h-4" /> {user.name}
              </h2>
              <p className="flex items-center text-sm text-gray-700">
                <Mail className="w-4 h-4 mr-2" /> {user.email}
              </p>
              <p className="flex items-center text-sm text-gray-700">
                <Phone className="w-4 h-4 mr-2" /> {user.phone}
              </p>
              <p className="mt-2 text-xs text-gray-500">Catatan: {user.notes || "Tidak ada"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
