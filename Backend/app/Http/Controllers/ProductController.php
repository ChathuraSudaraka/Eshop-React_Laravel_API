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
            'productName' => $request->input('name'),
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
        try {
            // Find the product by its ID
            $product = Product::where('_id', $_id)->first();

            if ($product) {
                $product->update([
                    'productName' => $request->input('productName'),
                    'description' => $request->input('description'),
                    'price' => $request->input('price'),
                    'color' => $request->input('color'),
                    'qty' => $request->input('qty'),
                    'product_img' => $request->input('product_img')
                ]);

                // Return a success response
                return response()->json([
                    'status' => 'success',
                    'message' => 'Product updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product: ' . $e->getMessage()
            ], 500);
        }
    }

    public function DeleteProduct(Request $request, $_id)
    {
        try {
            $product = Product::where('_id', $_id)->first();

            if ($product) {
                $product->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Product deleted successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not found'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete product: ' . $e->getMessage()
            ], 500);
        }
    }
}
