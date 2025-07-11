import React, { useEffect, useState } from "react";

export default function AdmLaporan() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const totalBooking = bookings.length;
  const totalAktif = bookings.filter(b => b.status === "Aktif").length;
  const totalCancel = bookings.filter(b => b.status === "Batal").length;
  const totalPendapatan = bookings
    .filter(b => b.status === "Aktif")
    .reduce((sum, b) => sum + b.durasi * getFieldPrice(b.lapangan), 0);

  function getFieldPrice(fieldName) {
    if (fieldName.includes("Premium A")) return 150000;
    if (fieldName.includes("Standard B")) return 100000;
    if (fieldName.includes("VIP Elite")) return 200000;
    return 0;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">Laporan Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="p-4 border rounded-xl shadow bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-700">Total Booking</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalBooking}</p>
        </div>
        <div className="p-4 border rounded-xl shadow bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-700">Aktif</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalAktif}</p>
        </div>
        <div className="p-4 border rounded-xl shadow bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-700">Batal</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">{totalCancel}</p>
        </div>
        <div className="p-4 border rounded-xl shadow bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-700">Pendapatan</h2>
          <p className="text-2xl font-bold text-emerald-800 mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}
