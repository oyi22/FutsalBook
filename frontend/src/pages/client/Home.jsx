import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiWifi,
  FiCamera,
  FiShield,
  FiUsers,
  FiClock
} from "react-icons/fi"

import FieldCard from "../../components/FieldCard"

const FIELD_DATA = [
  {
    id: 1,
    name: "Lapangan Premium A",
    type: "Indoor AC Premium",
    status: "Tersedia",
    description:
      "Lapangan indoor premium dengan AC, pencahayaan LED, dan lantai vinyl berkualitas. Cocok untuk turnamen dan latihan serius.",
    price: "Rp 150.000/jam",
    capacity: "10-14 orang",
    currentBookings: 0,
    availableSlots: 8,
    facilities: [
      { icon: FiWifi, name: "WiFi Gratis" },
      { icon: FiCamera, name: "CCTV" },
      { icon: FiShield, name: "Security 24h" },
      { icon: FiUsers, name: "Ruang Ganti" }
    ]
  },
  {
    id: 2,
    name: "Lapangan Standard B",
    type: "Indoor Standard",
    status: "Tersedia",
    description:
      "Lapangan indoor dengan ventilasi baik dan pencahayaan optimal. Cocok untuk bermain santai.",
    price: "Rp 100.000/jam",
    capacity: "10-14 orang",
    currentBookings: 2,
    availableSlots: 6,
    facilities: [
      { icon: FiWifi, name: "WiFi Gratis" },
      { icon: FiCamera, name: "CCTV" },
      { icon: FiUsers, name: "Ruang Ganti" },
      { icon: FiClock, name: "24 Jam" }
    ]
  },
  {
    id: 3,
    name: "Lapangan VIP Elite",
    type: "Indoor VIP Premium",
    status: "Tersedia",
    description:
      "Lapangan VIP dengan tribun, sound system, dan layanan premium. Ideal untuk acara spesial.",
    price: "Rp 200.000/jam",
    capacity: "10-14 orang",
    currentBookings: 1,
    availableSlots: 7,
    facilities: [
      { icon: FiWifi, name: "WiFi Premium" },
      { icon: FiCamera, name: "Live Stream" },
      { icon: FiShield, name: "VIP Security" },
      { icon: FiUsers, name: "VIP Lounge" }
    ]
  }
]

const TOTAL_SLOTS = 8

export default function Home() {
  const [fields, setFields] = useState(FIELD_DATA)
  const navigate = useNavigate()

  useEffect(() => {
    const updateFieldStatus = () => {
      setFields(prev =>
        prev.map(field => {
          const shouldUpdate = Math.random() < 0.1
          if (!shouldUpdate) return field

          const maxBookings = Math.min(
            TOTAL_SLOTS,
            field.currentBookings + Math.floor(Math.random() * 3)
          )

          const newBookings = Math.max(
            0,
            maxBookings - Math.floor(Math.random() * 2)
          )

          return {
            ...field,
            currentBookings: newBookings,
            availableSlots: TOTAL_SLOTS - newBookings,
            status: TOTAL_SLOTS - newBookings > 0 ? "Tersedia" : "Penuh"
          }
        })
      )
    }

    const interval = setInterval(updateFieldStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleBookingClick = fieldId => {
    navigate("/booking", { state: { fieldId } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Premium Futsal
            </span>
            <br />
            <span className="text-gray-800">Experience</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nikmati pengalaman futsal terbaik dengan fasilitas premium dan sistem booking real-time.
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live Status Updates</span>
            </div>
            <span>•</span>
            <span>24/7 Available</span>
            <span>•</span>
            <span>Instant Booking</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pilih Lapangan Favorit Anda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Semua lapangan dilengkapi fasilitas modern dan sistem booking real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map(field => (
            <FieldCard
              key={field.id}
              field={field}
              onBookingClick={handleBookingClick}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
