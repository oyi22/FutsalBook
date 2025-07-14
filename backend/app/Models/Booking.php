<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'api_token',
        'field_name',
        'location',
        'date',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'name',
        'phone',
        'email',
        'notes',
    ];
}