<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'mobile' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        // Create the user
        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'gender' => $request->gender,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => $request->password,
            'address' => [
                'line' => $request->line,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
            ],
            'payment' => [
                [
                    'card_number' => $request->card_number,
                    'card_type' => $request->card_type,
                    'expire_date' => $request->expire_date,
                    'cvv' => $request->cvv,
                ]
            ],
            'status' => 'active', // You might want to set default values for other fields
            'role' => $this->determineRole($request->email),
        ]);

        return response()->json([
            "status" => "success",
            "message" => "User created successfully",
            "role" => $user->role // Return the role assigned to the user
        ]);
    }

    // Function to determine user role based on email
    protected function determineRole($email)
    {
        // Check if the email is for the admin
        if ($email === 'chathurabro68@gmail.com') {
            return 'admin';
        } else {
            return 'user';
        }
    }

    public function updateUser(Request $request)
    {
        $user = $request->user(); // Get the authenticated user

        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'mobile' => ['required', 'string', 'max:255'],
            'line' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:50'],
        ]);

        // Update user details
        $user->update([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'mobile' => $request->mobile,
            'address' => [
                'line' => $request->line,
                'postal_code' => $request->postal_code,
            ]
        ]);

        return response()->json([
            'status' => 'success',
            'msg' => $user,
            'message' => 'User updated successfully',
        ]);
    }
}
