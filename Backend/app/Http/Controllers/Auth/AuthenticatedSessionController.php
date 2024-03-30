<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $logged_in = Auth::attempt($request->only('email', 'password'));

        if (!$logged_in) {
            return response()->json([
                "status" => "error",
                "message" => "Invalid credentials",
            ], 401);
        }

        $user = request()->user();

        return response()->json([
            "status" => "success",
            "message" => "User logged in successfully",
            "user" => $user,
            "token" => $user->createToken("auth_token")->plainTextToken,
        ]);
    }

    /**
     * Handle an incoming authentication request (using LoginRequest).
     */
    public function store(LoginRequest $request): Response
    {
        $request->authenticate();

        $request->session()->regenerate();

        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
