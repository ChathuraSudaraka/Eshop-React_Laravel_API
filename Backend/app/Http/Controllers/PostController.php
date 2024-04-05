<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function createContact(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'message' => 'required|string',
        ]);

        // Create a new contact record
        $contact = Contact::create($validatedData);

        // Return success response
        return response()->json([
            'status' => 'success',
            'message' => 'Contact added successfully',
            'contact' => $contact,
        ]);
    }

    public function loadPosts(Request $request)
    {
        // Load all posts
    }
}
