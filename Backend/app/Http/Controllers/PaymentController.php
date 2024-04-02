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
        ]);

        $this->AddpaymentMethod($request);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment details added successfully',
        ]);
    }

    public function AddpaymentMethod(Request $request)
    {
        // Retrieve the authenticated user
        $user = request()->user();

        // Validate the payment method
        $request->validate([
            'card_number' => ['required', 'string', 'max:255'],
            'card_type' => ['required', 'string', 'max:255'],
            'expire_date' => ['required', 'string', 'max:255'],
            'cvv' => ['required', 'string', 'max:255'],
        ]);

        // Update the user's payment method
        $user->push(
            'payment',
            [
                'id' => uniqid(),
                'card_number' => $request->card_number,
                'card_type' => $request->card_type,
                'expire_date' => $request->expire_date,
                'cvv' => $request->cvv,
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method add successfully',
        ]);
    }

    public function DeletepaymentMethod(Request $request)
    {
        // Retrieve the authenticated user
        $user = $request->user();

        $user->payment = array_values(array_filter($user->payment, function ($payment) use ($request) {
            return $payment['id'] !== $request->id;
        }));

        // Save the changes to the user
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method deleted successfully',
        ]);
    }

    public function EditpaymentMethod(Request $request, $id)
    {
        // Retrieve the authenticated user
        $user = request()->user();
        $payment = $user->payment;

        // Check if the payment method exists
        if ($payment == null || empty($payment)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment method not found.',
            ], 404);
        }
        $method = null;
        foreach ($payment as $key => $payment) {
            if ($payment['id'] == $id) {
                $method = $payment;
                break;
            }
        }
        if ($method == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment method not found',
            ], 404);
        }

        // Update the payment method
        $user->raw()->updateOne(
            ['email' => $user->email],
            ['$set' => [
                'payment.$[elem].cvv' => $request->cvv,
                'payment.$[elem].expire_date' => $request->expire_date,
            ]],
            ['arrayFilters' => [['elem.id' => $id]]]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method Update successfully',
            'user' => $user,
            'method' => $method,
        ]);
    }
}
