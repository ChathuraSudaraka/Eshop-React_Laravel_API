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

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'gender_id' => $request->gender_gender_id,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => Hash::make($request->password),
            "status_id" => 1,
            "role_id" => 2,
        ]);

        return response()->json([
            "status" => "success",
            "message" => "User created successfully",
        ]);
    }

    public function updateUser(Request $request)
    {
        $user = $request->user(); // Get the authenticated user

        $request->validate([
            'fname' => ['required', 'string', 'max:255'],
            'lname' => ['required', 'string', 'max:255'],
            'mobile' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'postal_code' => ['required', 'string', 'max:50'],
        ]);

        // Update user details
        $user->update([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'mobile' => $request->mobile,
            'email' => $request->email,
        ]);

        $address = $user->address()->first();

        // Update address details
        $address->update([
            "line" => $request->address,
            "postal_code" => $request->postal_code,
        ]);


        return response()->json([
            'status' => 'success',
            'msg' => $address,
            'message' => 'User updated successfully',
        ]);
    }
}
