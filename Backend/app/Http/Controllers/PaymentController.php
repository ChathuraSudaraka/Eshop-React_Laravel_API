<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class PaymentController extends Controller
{
    public function paymentSignUp(Request $request)
    {
        // Retrieve the authenticated user
        $user = request()->user();

        // Validate the payment details
        $request->validate([
            'line' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'card_number' => ['required', 'string', 'max:255'],
            'expire_date' => ['required', 'string', 'max:255'],
            'cvv' => ['required', 'string', 'max:255'],
        ]);

        // Update the user's payment details
        $user->update([
            'address' => [
                'line' => $request->line,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
                'country' => $request->country,
            ],
            'payment' => [
                'card_number' => $request->card_number,
                'expire_date' => $request->expire_date,
                'cvv' => $request->cvv,
            ],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment details added successfully',
        ]);
    }
}
