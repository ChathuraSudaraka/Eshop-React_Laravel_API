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
            'sory_by' => 'nullable|string',
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
            'productName' => $request->input('name'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
            'sort_by' => $request->input('sort_by'),
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

    public function loadProducts(Request $request)
    {
        // Load all products
        $products = Product::all();

        // Return success response
        return response()->json([
            'status' => 'success',
            'products' => $products,
            'message' => 'Products loaded successfully',
        ]);
    }

    public function UpdateProduct(Request $request, $_id)
    {
        // Find the product
        $product = Product::where('_id', $_id)->first();

        if ($product) {
            // Update the product
            $product->update([
                'productName' => $request->input('name'),
                'description' => $request->input('description'),
                'qty' => $request->input('qty'),
                'price' => $request->input('price'),
                'color' => $request->input('color'),
                'product_img' => json_decode($request->product_img),
            ]);

            // Return success response
            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }
    }

    public function DeleteProduct($productId)
    {
        // Find the product
        $product = Product::where('_id', $productId)->first();

        if ($product) {
            // Delete the product
            $product->delete();

            // Return success response
            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }
    }
}
