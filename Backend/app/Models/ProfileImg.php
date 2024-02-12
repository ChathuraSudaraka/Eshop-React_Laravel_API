<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileImg extends Model
{
    use HasFactory;
    protected $table = 'profile_img';
    public $timestamps = false;
    protected $fillable = [
        'users_id',
        'path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
