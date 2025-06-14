import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, History, MessageSquare, User } from 'lucide-react'

const menuItems = [
  { href: '/Home', label: 'Home', icon: Home, color: 'from-blue-400 to-blue-600' },
  { href: '/booking-history', label: 'Riwayat', icon: History, color: 'from-emerald-400 to-teal-600' },
  { href: '/feedback', label: 'Ulasan', icon: MessageSquare, color: 'from-amber-400 to-orange-600' },
  { href: '/user-profile', label: 'Saya', icon: User, color: 'from-purple-400 to-indigo-600' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const toggleMenu = () => setIsOpen(prev => !prev)
  const handleNavigation = (href) => {
    navigate(href)
    setIsOpen(false)
  }
  const isActivePath = (href) => currentPath.startsWith(href)

  const renderItem = (item, index, isMobile = false) => {
    const active = isActivePath(item.href)
    const baseClass = `group flex items-center space-x-4 px-6 py-3 rounded-2xl transition-all duration-300 border`
    const activeClass = `text-white bg-white/10 border-white/20 shadow-lg`
    const inactiveClass = `text-white/80 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10`
    const iconBox = `p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg group-hover:shadow-xl transition-all duration-300 ${active ? 'scale-110 shadow-2xl' : ''}`
    
    return (
      <a
        key={item.href}
        href={item.href}
        onClick={(e) => { e.preventDefault(); handleNavigation(item.href) }}
        className={`${baseClass} ${active ? activeClass : inactiveClass} ${isMobile ? `delay-${index * 100}` : ''}`}
        style={isMobile ? { transitionDelay: isOpen ? `${index * 100}ms` : '0ms' } : {}}
      >
        <div className={iconBox}><item.icon className="w-5 h-5 text-white" /></div>
        <div className="flex-1">
          <span className={`font-semibold ${isMobile ? 'text-lg' : 'text-sm'} ${active ? 'text-white' : ''}`}>
            {item.label}
          </span>
          <div className={`h-0.5 bg-gradient-to-r from-white/50 to-transparent rounded-full ${active ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500`} />
        </div>
        {active && !isMobile && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
        )}
        {active && isMobile && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-full"></div>
        )}
      </a>
    )
  }

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-white/5 shadow-2xl">
      {/* Background + animated particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 absolute inset-0" />
        <div className="bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)] absolute inset-0" />
        <div className="bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)] absolute inset-0" />
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-4 right-1/3 w-1 h-1 bg-teal-400/60 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-2 left-2/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span className="text-white font-bold text-xl">⚽</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent tracking-tight group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-500">
                FutsalBook
              </h1>
              <div className="h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 relative">
            {menuItems.map((item, index) => renderItem(item, index))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-3 rounded-2xl hover:bg-white/10 border border-white/5 hover:border-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-110"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden backdrop-blur-2xl border-t border-white/5 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="relative bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-900/80 px-4 py-6 space-y-2">
          {menuItems.map((item, index) => renderItem(item, index, true))}
        </div>
      </div>
    </nav>
  )
}
