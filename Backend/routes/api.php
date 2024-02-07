<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return response()->json([
        'status' => 'success',
        'user' => $request->user()
    ]);
});

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/logout', function(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json([
        "status" => "success",
        "message" => "Logged out successfully"
    ]);
});