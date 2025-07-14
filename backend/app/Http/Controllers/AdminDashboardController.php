<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Booking;
use App\Models\Lapangan;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        // Total booking hari ini
        $bookingHariIni = Booking::whereDate('created_at', $today)->count();

        // Total pemasukan hari ini
        $totalPemasukan = Booking::whereDate('created_at', $today)->sum('total_bayar');

        // Lapangan aktif hari ini (misalnya status 'aktif')
        $lapanganAktif = Lapangan::where('status', 'aktif')->count();

        return response()->json([
            'booking_hari_ini' => $bookingHariIni,
            'total_pemasukan' => $totalPemasukan,
            'lapangan_aktif' => $lapanganAktif,
        ]);
    }
}
