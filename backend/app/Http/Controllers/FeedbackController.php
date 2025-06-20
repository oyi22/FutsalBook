<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Feedback::create([
            'message' => $request->message,
            'rating' => $request->rating,
        ]);

        return response()->json(['success' => true, 'message' => 'Feedback terkirim']);
    }
}
