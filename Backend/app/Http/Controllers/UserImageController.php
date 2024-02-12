<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        $user = $request->user();

        // Validate the uploaded file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Store the image
        $path = $request->file('image')->store('profile_images', 'public');

        // Associate the image with the authenticated user
        $user->image()->updateOrCreate(
            ['users_id' => $user->id],
            ['path' => $path]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded successfully'
        ]);
    }
}
