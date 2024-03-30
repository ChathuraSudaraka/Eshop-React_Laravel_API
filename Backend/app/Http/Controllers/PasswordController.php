<?php

namespace App\Http\Controllers;

use App\Mail\ForgetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PasswordController extends Controller
{
    private function generateOtp($user)
    {
        $max_request_per_day = 100;

        $otps = $user->otps;
        $today_requests = 0;

        // Get today's requests
        if (is_array($otps)) {
            $today_requests = count(array_filter($otps, function ($otp) {
                return Carbon::parse($otp['created_at'])->isToday();
            }));
        } else {
            $otps = [];
        }

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
        $user->push('otps', [
            'id' => count($otps) + 1,
            'otp' => $otp,
            'is_used' => false,
            'created_at' => now()->toString(),
            'expires_at' => now()->addMinutes(15)->toString(),
        ]);

        return [
            'status' => 'success',
            'message' => 'OTP sent to your email. Please check your inbox.',
            'otp' => $otp,
            'pending_requests' => $max_request_per_day - $today_requests - 1,
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
        Mail::to($request->email)->queue(new ForgetPasswordMail([
            'email' => $request->email,
            'name' => "$user->fname $user->lname",
            'otp' => $output['otp'],
        ]));

        return response()->json([
            'status' => 'success',
            'message' => $output['message'],
            'pendingRequests' => $output['pending_requests'],
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
