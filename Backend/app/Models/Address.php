<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'user_has_address';

    protected $fillable = [
        'users_id',
        'city_city_id',
        'line',
        'postal_code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
