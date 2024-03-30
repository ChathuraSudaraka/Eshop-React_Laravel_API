<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class OtpverifyController extends Controller
{
    public function otpVerify(Request $request)
    {
        $request->validate([
            'otps' => 'required|numeric',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!is_array($user->otps)) {
            return response()->json([
                'message' => 'Invalid OTP.',
            ], 400);
        }
        
        $otps = $user->otps[count($user->otps) - 1];
        if ($otps['otp'] == $request->otps) {
            return response()->json([
                'status' => 'success',
                'message' => 'OTP verified successfully.',
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid OTP.',
                'otps' => $otps['otp'],
            ], 400);
        }
    }
}
