import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Selamat Datang di Dashboard Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card: Booking Masuk */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Booking Hari Ini</h2>
            <p className="text-3xl text-blue-700 font-bold">12</p>
          </div>

          {/* Card: Laporan */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Laporan Harian</h2>
            <p className="text-sm text-gray-500">Total pemasukan hari ini</p>
            <p className="text-2xl font-bold text-green-600">Rp 1.200.000</p>
          </div>

          {/* Card: Status Lapangan */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Lapangan Aktif</h2>
            <p className="text-xl font-bold">3</p>
            <p className="text-sm text-gray-500">Terjadwal hari ini</p>
          </div>

        </div>

        {/* Tambahan fitur admin */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3">Pengaturan Cepat</h3>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li><a href="/admin/lapangan" className="block bg-blue-600 text-white p-4 rounded-xl text-center hover:bg-blue-800">Kelola Lapangan</a></li>
            <li><a href="/admin/jadwal" className="block bg-green-600 text-white p-4 rounded-xl text-center hover:bg-green-800">Atur Jadwal</a></li>
            <li><a href="/admin/laporan" className="block bg-yellow-500 text-white p-4 rounded-xl text-center hover:bg-yellow-700">Lihat Laporan</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard