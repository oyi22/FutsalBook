import React, { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown
} from "lucide-react"

export default function BookingHistory() {
  // State: Data
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])

  // State: Filter
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // State: UI
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulasi loading data
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockBookings = [] 
      setBookings(mockBookings)
      setFilteredBookings(mockBookings)
      setIsLoading(false)
    }

    loadBookings()
  }, [])

  useEffect(() => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.fieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter])

  const getStatusColor = status => {
    const statusColors = {
      completed: "bg-green-100 text-green-800 border-green-200",
      ongoing: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      upcoming: "bg-yellow-100 text-yellow-800 border-yellow-200"
    }

    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getStatusIcon = status => {
    const icons = {
      completed: <CheckCircle className="w-4 h-4" />,
      ongoing: <AlertCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
      upcoming: <Clock className="w-4 h-4" />
    }

    return icons[status] || <Clock className="w-4 h-4" />
  }

  const getStatusText = status => {
    const textMap = {
      completed: "Selesai",
      ongoing: "Sedang Berlangsung",
      cancelled: "Dibatalkan",
      upcoming: "Akan Datang"
    }

    return textMap[status] || status
  }

  const formatDate = dateString => {
    const date = new Date(dateString)

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const formatTime = timeString => timeString.substring(0, 5)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md w-48 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // UI utama 
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Booking</h1>
          <p className="text-gray-600">Kelola dan pantau semua booking lapangan Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari lapangan atau lokasi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[140px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Filter</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {[
                      { value: "all", label: "Semua Status" },
                      { value: "upcoming", label: "Akan Datang" },
                      { value: "ongoing", label: "Sedang Berlangsung" },
                      { value: "completed", label: "Selesai" },
                      { value: "cancelled", label: "Dibatalkan" }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value)
                          setIsFilterOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md ${
                          statusFilter === option.value
                            ? "bg-blue-100 text-blue-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== "all" ? "Tidak ada hasil ditemukan" : "Belum ada riwayat booking"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "Coba ubah kriteria pencarian atau filter Anda"
                  : "Booking lapangan pertama Anda akan muncul di sini"}
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{booking.fieldName}</h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="text-lg font-bold text-gray-900">
                        Rp {booking.totalPrice?.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
