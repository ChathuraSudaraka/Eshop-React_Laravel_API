<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\OtpverifyController;
use App\Http\Controllers\PasswordChangeController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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

// Public Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'create']);
Route::post('/forgot-password', [PasswordController::class, 'forgotPassword']);
Route::post('/otp-verify', [OtpverifyController::class, 'otpVerify']);
Route::post('/reset-password', [PasswordChangeController::class, 'resetPassword']);
Route::get('/product-load', [ProductController::class, 'loadProducts']);
// Authenticated Routes with Sanctum authentication
// routes/web.php or routes/api.php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/upload-image', [UserImageController::class, 'uploadImage']);
    Route::post('/change-password', [PasswordChangeController::class, 'changePassword']);
    Route::post('/update-user', [RegisteredUserController::class, 'updateUser']);
    Route::post('/payment', [PaymentController::class, 'paymentSignUp']);
    Route::post('/payment-method', [PaymentController::class, 'AddpaymentMethod']);
    Route::delete('/payment-method-delete/{id}', [PaymentController::class, 'DeletepaymentMethod']);
    Route::post('/payment-method-edit/{id}', [PaymentController::class, 'EditpaymentMethod']);
    Route::post('/product-add', [ProductController::class, 'AddProduct']);
    Route::post('/product-update/{productId}', [ProductController::class, 'UpdateProduct']);
    Route::delete('/product-delete/{productId}', [ProductController::class, 'DeleteProduct']);
    // Add other routes requiring Sanctum authentication here
});

// Logout with token deletion
Route::middleware(['auth:sanctum'])->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json([
        "status" => "success",
        "message" => "Logged out successfully"
    ]);
})->name('logout');

// User endpoint requiring Sanctum authentication
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return response()->json([
        'status' => 'success',
        'user' => $request->user(),
        'message' => 'User data retrieved successfully'
    ]);
});
