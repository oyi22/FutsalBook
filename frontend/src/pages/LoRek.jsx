import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight, FiUserPlus, FiPhone, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

// Base API URL
const API_URL = 'http://localhost:8000/api';

// Register function
const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Network error occurred');
  }
};

// Login function
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Network error occurred');
  }  
};

const REGISTER_FIELDS = [
  { type: "text", placeholder: "Masukkan nama", icon: FiUser, name: "fullName", label: "Nama" },
  { type: "email", placeholder: "Masukkan Email", icon: FiMail, name: "email", label: "Email" },
  { type: "password", placeholder: "Buat Password", icon: FiLock, name: "password", label: "Password", hasToggle: true },
]

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({ email: "", password: "", fullName: ""})

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const result = await login(formData.email, formData.password) 
      
      if (!result.success) {
        // Handle errors dari backend
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat().join(', ')
          setError(errorMessages)
        } else {
          setError(result.message || "Login gagal!")
        }
      } else {
        // Store user data and token
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setSuccess("Login berhasil! Mengarahkan ke dashboard...")
        // redirect ke dashboard instead of /home
        setTimeout(() => navigate("/home"), 1500)
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login!")
    }
    
    setIsLoading(false)
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError("")
    
    if (formData.email && formData.password && formData.fullName ) {
      try {
        const result = await register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        })
        
        if (!result.success) {
          // Handle validasi errors
          if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join(', ')
            setError(errorMessages)
          } else {
            setError(result.message || "Registrasi gagal!")
          }
        } else {
          setSuccess("Registrasi berhasil! Silakan login dengan akun Anda.")
          // Reset form danswitch ke login
          setTimeout(() => {
            setIsLogin(true)
            setFormData({ email: formData.email, password: "", fullName: ""})
            setSuccess("")
          }, 2000) 
        }
      } catch (err) {
        setError("Terjadi kesalahan saat registrasi!")
      }
    } else {
      setError("Mohon lengkapi semua field!")
    }
    
    setIsLoading(false)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setShowPassword(false)
    setError("")
    setSuccess("")
    setFormData({ email: "", password: "", fullName: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full blur-3xl transition-all duration-1000 ease-out ${isLogin ? 'scale-100 rotate-0' : 'scale-125 translate-x-32 -translate-y-16 rotate-45'}`} />
        <div className={`absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-teal-300/30 to-cyan-300/30 rounded-full blur-3xl transition-all duration-1000 ease-out ${isLogin ? 'scale-100 rotate-0' : 'scale-125 -translate-x-32 translate-y-16 rotate-45'}`} />
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl transition-all duration-700 ${isLogin ? 'opacity-100 scale-100' : 'opacity-60 scale-150'}`} />
        <div className={`absolute bottom-1/4 left-1/4 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl transition-all duration-900 ${isLogin ? 'opacity-100 scale-100' : 'opacity-100 scale-125'}`} />
        {/*floating particles*/}
        <div className={`absolute top-20 left-20 w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse`} />
        <div className={`absolute top-40 left-32 w-1 h-1 bg-teal-400/60 rounded-full animate-bounce`} />
        <div className={`absolute bottom-32 left-40 w-3 h-3 bg-cyan-400/30 rounded-full animate-pulse`} />
      </div>

      {/*main container*/}
      <div className="relative w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl bg-white/95 backdrop-blur-xl border border-white/50 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-emerald-200/50">
      {/*sliding panel*/}
        <div className={`absolute top-0 w-1/2 h-full z-20 transition-all duration-700 ease-in-out transform ${isLogin ? 'translate-x-full' : 'translate-x-0'} ${isLogin ? 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600' : 'bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600'} flex items-center justify-center text-white`}>
          <div className={`text-center px-8 transform transition-all duration-500 ${isLogin ? 'translate-x-0' : 'translate-x-0'}`}>
            {isLogin ? (
              <div className="opacity-0 animate-fade-in">
                <FiUserPlus className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold mb-4">Belum Punya Akun?</h2>
                <p className="mb-6 text-emerald-100 leading-relaxed">Silahkan melakukan registrasi dengan klik tombol di bawah ini</p>
                <button 
                  onClick={toggleMode} 
                  className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
                >
                  Mendaftar
                </button>
              </div>
            ) : (
              <div className="opacity-0 animate-fade-in">
                <FiUser className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-4">Selamat Datang</h2>
                <p className="mb-6 text-teal-100 leading-relaxed">Login untuk melanjutkan booking</p>
                <button 
                  onClick={toggleMode} 
                  className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        
        <div className={`w-1/2 p-8 flex items-center justify-center transition-all duration-500 ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {isLogin && (
            <div className="w-full max-w-sm opacity-0 animate-fade-in-up">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Login</h3>
                <p className="text-gray-600">Selamat datang kembali di FutsalBook</p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 transform transition-all duration-300 hover:scale-105">
                  <p className="text-xs text-blue-800 font-medium">Demo Login:</p>
                  <p className="text-xs text-blue-700">Email: rpl@gmail.com</p>
                  <p className="text-xs text-blue-700">Password: rplHORE</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 animate-slide-down">
                  <FiAlertCircle className="text-red-500 animate-pulse" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-slide-down">
                  <FiCheckCircle className="text-green-500 animate-bounce" />
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative group">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-emerald-500 transition-colors duration-200" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan Email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-300"
                    />
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative group">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-emerald-500 transition-colors duration-200" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Masukkan Password"
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-300"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer hover:text-emerald-600 transition-colors duration-200">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-all duration-200" />
                    <span className="ml-2 text-gray-600">Ingatkan Saya</span>
                  </label>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-200 hover:scale-105">Lupa Password?</a>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Login</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`w-1/2 p-8 flex items-center justify-center transition-all duration-500 ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          {!isLogin && (
            <div className="w-full max-w-sm opacity-0 animate-fade-in-up">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Mendaftar</h3>
                <p className="text-gray-600">Buat Akun FutsalBook Anda</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 animate-slide-down">
                  <FiAlertCircle className="text-red-500 animate-pulse" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-slide-down">
                  <FiCheckCircle className="text-green-500 animate-bounce" />
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              )}

              <div className="space-y-4">
                {REGISTER_FIELDS.map((field, index) => (
                  <div key={field.name} className="transform transition-all duration-300 hover:scale-105" style={{ animationDelay: `${index * 100}ms` }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <div className="relative group">
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-teal-500 transition-colors duration-200" />
                      <input
                        type={field.hasToggle ? (showPassword ? "text" : "password") : field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300"
                      />
                      {field.hasToggle && (
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                        >
                          {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 hover:scale-105 active:scale-95 transform"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Buat Akun</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
