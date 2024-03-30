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
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found.',
            ], 404);
        }

        // Find the OTP
        $otps = $user->otps[count($user->otps) - 1];
        if ($otps["otp"] != $request->otps) {
            return response()->json([
                'error' => 'OTP code has been expired.',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->newPassword),
        ]);

        // Delete the used OTP (optional, depending on your logic)
        $user->otps = [];

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
