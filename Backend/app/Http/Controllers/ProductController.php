<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function addProduct(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'qty' => 'required|integer',
            'sku' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'breadth' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'color' => 'nullable|string',
            'is_hidden' => 'nullable|boolean',
            'product_img.*' => 'required',
        ]);

        // Create new Product instance
        $product = new Product([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
            'qty' => $request->input('qty'),
            'sku' => $request->input('sku'),
            'weight' => $request->input('weight'),
            'length' => $request->input('length'),
            'breadth' => $request->input('breadth'),
            'width' => $request->input('width'),
            'price' => $request->input('price'),
            'discount' => $request->input('discount'),
            'color' => $request->input('color'),
            'product_img' => json_decode($request->product_img),
            'is_hidden' => $request->input('is_hidden', false),
        ]);

        // Save the product
        $product->save();

        // Return success response
        return response()->json([
            'status' => 'success',
            'message' => 'Product added successfully',
        ]);
    }
}
