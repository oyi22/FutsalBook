<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller {
    public function index() {
        return response()->json(Booking::all());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'field_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'required|in:completed,ongoing,cancelled,upcoming',
            'total_price' => 'required|integer',
        ]);

        $booking = Booking::create($validated);
        return response()->json($booking, 201);
    }

    public function show($id) {
        return response()->json(Booking::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'field_name' => 'string|max:255',
            'location' => 'string|max:255',
            'date' => 'date',
            'start_time' => 'string',
            'end_time' => 'string',
            'status' => 'in:completed,ongoing,cancelled,upcoming',
            'total_price' => 'integer',
        ]);

        $booking->update($validated);
        return response()->json($booking);
    }

    public function destroy($id) {
        Booking::destroy($id);
        return response()->json(null, 204);
    }
}
