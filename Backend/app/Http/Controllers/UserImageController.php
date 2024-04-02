<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        // Validate the image
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Retrieve the authenticated user
        $user = $request->user();

        // Store the image in the public storage
        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->storeAs('/public/profile_images', $imageName);

        // Update the user's profile image
        $user->update([
            'profile_img' => $imageName,
        ]);

        // Get the full image path
        $imagePath = '/storage/public/profile_images/' . $imageName;

        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded successfully',
            'image_path' => $imagePath,
        ]);
    }
}
