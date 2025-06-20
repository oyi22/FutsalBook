import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { User, Mail, Settings, Edit3, LogOut } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal memuat data user:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "", email: "" });
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Profil Pengguna</h2>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
      <p className="text-gray-700 mb-2"><strong>Nama:</strong> {user.name}</p>
      <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
