<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PasswordController extends Controller
{
    private function generate0tp($user)
    {

        $max_request_per_day = 5;

        $today_requests = $user->otps()->where('created_at', '>', now()->subDay())->count();

        // Send error message
        if ($today_requests >= $max_request_per_day) {
            return [
                'status' => 'error',
                'message' => 'You have exceeded the maximum number of OTP requests. Please try again after 24 hours.',
            ];
        }

        // Generate a random 6-digit number
        $otp = rand(100000, 999999);

        // Save the OTP to the database
        $user->otps()->create([
            'otp' => $otp,
            'expires_at' => now()->addMinutes(20),
        ]);

        return [
            'status' => 'success',
            'message' => 'OTP sent to your email. Please check your inbox.',
            'otp' => $otp,
            'pending_requests' => $max_request_per_day - $today_requests - 1,

        ];
    }
}
