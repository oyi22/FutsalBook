import React from "react"
import { CheckCircle, XCircle, MapPin } from "lucide-react"

const STATUS_CONFIG = {
  available: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    glow: "from-emerald-500/20 to-teal-500/20"
  },
  unavailable: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    gradient: "from-red-500/10 to-red-600/5",
    glow: "from-red-500/20 to-pink-500/20"
  }
}

function FieldCard({ field, onBookingClick }) {
  const isAvailable = field.status === "Tersedia"
  const statusConfig = isAvailable ? STATUS_CONFIG.available : STATUS_CONFIG.unavailable
  const StatusIcon = statusConfig.icon

  const handleBookingClick = () => {
    if (isAvailable && onBookingClick) {
      onBookingClick(field.id)
    }
  }

  return (
    <div className="group relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${statusConfig.glow} rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-lg`} />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-blue-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_70%)]" />

        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-emerald-700 transition-all duration-500">
                {field.name}
              </h2>

              <div className="flex items-center space-x-3 mt-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 font-medium">{field.type}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {field.price}
                </span>
              </div>
            </div>

            <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl ${statusConfig.bg} ${statusConfig.border} border-2 backdrop-blur-sm shadow-lg`}>
              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
              <span className={`text-sm font-bold ${statusConfig.color}`}>{field.status}</span>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="text-7xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
                ⚽
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        <div className="relative px-6 pb-6 space-y-5">
          <p className="text-gray-600 leading-relaxed text-sm">{field.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {field.facilities.map((facility, index) => {
              const Icon = facility.icon
              return (
                <div
                  key={`facility-${index}`}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-medium text-gray-700">{facility.name}</span>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-white/60 to-gray-50/60 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{field.capacity}</div>
                <div className="text-xs text-gray-500 font-medium">Kapasitas</div>
              </div>
              <div className="text-center border-x border-gray-200/50">
                <div className="text-lg font-bold text-gray-900">{field.currentBookings}</div>
                <div className="text-xs text-gray-500 font-medium">Terbooking</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${isAvailable ? "text-emerald-600" : "text-red-500"}`}>
                  {isAvailable ? field.availableSlots : "0"}
                </div>
                <div className="text-xs text-gray-500 font-medium">Tersedia</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookingClick}
            disabled={!isAvailable}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group/btn ${
              isAvailable
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAvailable && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            )}
            <span className="relative flex items-center justify-center space-x-2">
              <span>{isAvailable ? "🎯" : "❌"}</span>
              <span>{isAvailable ? "Book Sekarang" : "Tidak Tersedia"}</span>
            </span>
          </button>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-1000" />
      </div>
    </div>
  )
}

export default FieldCard
