<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\BookingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes (tidak perlu authentication)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (perlu authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // route API lainnya di sini
    // Route::apiResource('posts', PostController::class);
});


// Route untuk testing 
Route::get('/test', function () {
    return response()->json(['message' => 'API working!', 'status' => 'OK']);
});

//////FEEDBACK OYY
Route::post('/feedback', [FeedbackController::class, 'store']);

//BOOKING
// Endpoint Booking
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::put('/bookings/{id}', [BookingController::class, 'update']);