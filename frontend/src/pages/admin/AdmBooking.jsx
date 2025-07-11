import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Save, XCircle } from "lucide-react";

const getBookings = () => JSON.parse(localStorage.getItem("bookings") || "[]");

const updateBooking = (updated) => {
  const all = getBookings();
  const newList = all.map(b => b.id === updated.id ? updated : b);
  localStorage.setItem("bookings", JSON.stringify(newList));
};

const deleteBooking = (id) => {
  const newList = getBookings().filter(b => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(newList));
};

export default function AdmBooking() {
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleEdit = (b) => {
    setEditId(b.id);
    setEditData({ ...b });
  };

  const handleSave = () => {
    updateBooking(editData);
    setBookings(getBookings());
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin membatalkan booking ini?")) {
      deleteBooking(id);
      setBookings(getBookings());
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-emerald-700">Manajemen Booking</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl">
          <thead className="bg-emerald-50 text-emerald-700">
            <tr>
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">Lapangan</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4">Durasi</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-emerald-50/30">
                <td className="py-2 px-4">{b.name}</td>
                <td className="py-2 px-4">{b.lapangan}</td>
                <td className="py-2 px-4">
                  {editId === b.id ? (
                    <input type="date" value={editData.tanggal} onChange={e => setEditData({ ...editData, tanggal: e.target.value })} />
                  ) : b.tanggal}
                </td>
                <td className="py-2 px-4">
                  {editId === b.id ? (
                    <input type="time" value={editData.waktu} onChange={e => setEditData({ ...editData, waktu: e.target.value })} />
                  ) : b.waktu}
                </td>
                <td className="py-2 px-4">
                  {editId === b.id ? (
                    <input type="number" value={editData.durasi} min="1" onChange={e => setEditData({ ...editData, durasi: parseInt(e.target.value) })} />
                  ) : `${b.durasi} Jam`}
                </td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${b.status === "Aktif" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  {editId === b.id ? (
                    <div className="flex justify-center gap-2">
                      <button onClick={handleSave}><Save size={18} className="text-green-600" /></button>
                      <button onClick={() => setEditId(null)}><XCircle size={18} className="text-gray-500" /></button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(b)}><Pencil size={18} className="text-blue-600" /></button>
                      <button onClick={() => handleDelete(b.id)}><Trash2 size={18} className="text-red-600" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
