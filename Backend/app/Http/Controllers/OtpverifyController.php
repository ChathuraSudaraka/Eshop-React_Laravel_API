<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class OtpverifyController extends Controller
{
    public function otpVerify(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $otp = User::whereHas('otp', function ($query) use ($request) {
            $query->where('otp', $request->otp)->where('expires_at', '>', now());
        })->first();

        if (!$otp) {
            return response()->json([
                'message' => 'Invalid OTP.',
            ], 400);
        }

        $otp->otp()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'OTP verified successfully.',
        ]);
    }
}
