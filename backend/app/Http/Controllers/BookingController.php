<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Menampilkan daftar booking milik user yang sedang login (berdasarkan api_token)
     */
    public function index(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $bookings = Booking::where('user_id', $user->id)->get();

        return response()->json(['success' => true, 'data' => $bookings], 200);
    }

    /**
     * Simpan data booking baru dengan user_id
     */
    public function store(Request $request) {
        $token = $request->bearerToken();
        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'field_name' => 'required|string',
            'location' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
            'total_price' => 'required|integer',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
        ]);

        $validated['user_id'] = $user->id; // Tambahkan user_id ke data

        $booking = Booking::create($validated);

        return response()->json([
            'success' => true,
            'data' => $booking
        ], 201);
    }

    /**
     * Update status booking
     */
    public function update(Request $request, $id) {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'in:upcoming,ongoing,completed,cancelled',
        ]);

        $booking->update($validated);

        return response()->json($booking, 200);
    }
}
