import React, { useState, useEffect } from "react";
import { Calendar, Clock, Users, CreditCard, CheckCircle, ArrowRight, User, Phone, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


//ini jgnn di ganti ya
const FIELD_DATA = [
  {
    id: 1,
    name: "Lapangan Premium A",
    type: "Indoor AC Premium",
    price: 150000,
    location: "Indoor AC Premium"
  },
  {
    id: 2,
    name: "Lapangan Standard B", 
    type: "Indoor Standard",
    price: 100000,
    location: "Indoor Standard"
  },
  {
    id: 3,
    name: "Lapangan VIP Elite",
    type: "Indoor VIP Premium", 
    price: 200000,
    location: "Indoor VIP Premium"
  }
]

export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [playerCount, setPlayerCount] = useState(10);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({

    // lebokno db
    name: "",
    phone: "",
    email: "",
    notes: ""
  })

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fieldId = location.state?.fieldId;
    if (fieldId) {
      const field = FIELD_DATA.find(f => f.id === fieldId);
      setSelectedField(field);
    } else {
      navigate('/')
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  const calculateTotal = () => {
    return selectedField ? selectedField.price * duration : 0;
  }

  if (!selectedField) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-2">Detail Booking</h2>
              <p className="text-emerald-100">Isi Informasi dibawah ini untuk melakukan Pemesanan</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Selected Field Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Kategori Pesanan</label>
                  <div className="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedField.name}</h3>
                        <p className="text-sm text-gray-600">{selectedField.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">Rp {selectedField.price.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-gray-500">per Jam</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Pilih Tanggal Booking
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="inline w-4 h-4 mr-2" />
                    Pilih Durasi Booking
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                          selectedTime === time
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (Jam)</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    >
                      {[1, 2, 3, 4].map(hour => (
                        <option key={hour} value={hour}>{hour} Jam{hour > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Pemain
                    </label>
                    <input
                      type="number"
                      value={playerCount}
                      onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                      min="2"
                      max="22"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak Penyewa</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="masukkan nama lengkap"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Nomor HP
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="masukkan no hp"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Masukkan Email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pesan (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="permintaan khusus atau catatan"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ringkasan Pemesanan
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kategori :</span>
                      <span className="font-medium">{selectedField.name}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tanggal :</span>
                        <span className="font-medium">{new Date(selectedDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Waktu :</span>
                        <span className="font-medium">{selectedTime} - {String(parseInt(selectedTime.split(':')[0]) + duration).padStart(2, '0')}:00</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi :</span>
                      <span className="font-medium">{duration} Jam{duration > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pemain :</span>
                      <span className="font-medium">{playerCount} Orang</span>
                    </div>
                    <hr className="border-emerald-200" />
                    <div className="flex justify-between text-lg font-bold text-emerald-700">
                      <span>Total:</span>
                      <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.email}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Konfirmasi pesanan</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Bantuan? {" "}
            <a href="tel:+62123456789" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200">
              +62 123 456 789
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}