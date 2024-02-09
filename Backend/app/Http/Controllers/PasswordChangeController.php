<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PasswordChangeController extends Controller
{
    public function resetPassword(Request $request)
    {
        $request->validate([
            'newPassword' => 'required|min:8',
            'email' => 'required|email',
            'otp' => 'required|numeric',
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found.',
            ], 404);
        }

        // Find the OTP
        $otp = $user->otp()->where('otp', $request->otp)->where('expires_at', '>', now())->first();

        if (!$otp) {
            return response()->json([
                'error' => 'Invalid OTP.',
            ], 400);
        }


        // Change the password
        $user->password = Hash::make($request->newPassword);
        $user->save();

        // Delete the used OTP (optional, depending on your logic)
        $otp->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully.',
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        $user = auth()->user(); // Retrieve the authenticated user

        // Verify the current password
        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json([
                'error' => 'The provided current password does not match our records.',
            ], 400);
        }

        // Password verification passed, proceed with changing the password
        $user->update([
            'password' => Hash::make($request->newPassword),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully.'
        ]);
    }
}
