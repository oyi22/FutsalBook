import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NabarAdmin = () =>{
    const Location = useLocation()

    const navItems = [
        { path : '/admin', label : 'Dashboard' },
        { path : '/admin/booking', label : 'Data Booking' },
        { path : '/admin/lapangan', label : 'Lapangan & harga' },
        { path : '/admin/jadwal', label : 'Jadwal Lapangan' },
        { path : '/admin/Laporan', label : 'Laporan Harian' },
    ]

    return (
        <nav className=''>
            <div className="txt-xl">
                <ul className='flex gap-6'>
                    {navItems.map((item) => (
                        <li key ={item.path}>
                        <Link 
                        to ={item.path}
                        className={`hover:underline ${location.pathname === item.path ? 'font-semibold underline' : ''}`}
                        >
                        {item.path}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NabarAdmin