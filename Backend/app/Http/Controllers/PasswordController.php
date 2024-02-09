<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    function generateOtp($user)
    {
        $maxRequestsPerDay = 100;

        $todayRequests = $user->otp()->where('created_at', '>', now()->subDay())->count();

        // Send error message
        if ($todayRequests >= $maxRequestsPerDay) {
            return [
                'status' => 'error',
                'message' => 'You have exceeded the maximum number of OTP requests. Please try again after 24 hours.',
            ];
        }

        // Generate a random 6-digit number
        $otp = rand(100000, 999999);

        // Save the OTP to the database
        $user->otp()->create([
            'otp' => $otp,
            'expires_at' => now()->addMinutes(20),
        ]);

        return [
            'status' => 'success',
            'message' => 'OTP sent to your email. Please check your inbox.',
            'otp' => $otp,
            'pendingRequests' => $maxRequestsPerDay - $todayRequests - 1,
        ];
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found for the given email.',
            ], 404);
        }

        // Trying to generate OTP
        $output = $this->generateOtp($user);

        if ($output['status'] == 'error') {
            return response()->json([
                'message' => $output['message'],
            ], 429);
        }

        // Send OTP to user's email
        MailController::forgotPassword([
            'email' => $request->email,
            'name' => "{$user->fname} {$user->lname}",
            'otp' => $output['otp'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => $output['message'],
            'pendingRequests' => $output['pendingRequests'],
        ]);

    }

    // public function adminLogin(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !password_verify($request->password, $user->password)) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Invalid email or password.',
    //         ], 401); // 401 for unauthorized access
    //     }

    //     // Check if the user has the admin role (assuming 'role_id' is the column name)
    //     if ($user->role_id !== 1) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Access denied. User does not have admin privileges.',
    //         ], 403); // 403 for forbidden access
    //     }

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Login successful.',
    //     ]);
    // }
}
