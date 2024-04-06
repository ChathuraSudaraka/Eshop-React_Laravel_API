<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Omnipay\Omnipay;

class PaymentController extends Controller
{

    private $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId(env('PAYPAL_CLIENT_ID'));
        $this->gateway->setSecret(env('PAYPAL_CLIENT_SECRET'));
        $this->gateway->setTestMode(true);
    }

    public function pay(Request $request)
    {
        // return $request->items;
        try {
            $response = $this->gateway->purchase([
                'amount' => $request->amount,
                'items' => $request->items,
                'currency' => env('PAYPAL_CURRENCY'),
                'returnUrl' => route('payment.success'),
                'cancelUrl' => route('payment.cancel'),
            ])->send();

            return response()->json([
                'status' => 'success',
                'message' => $response->getData(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function checkout(Request $request)
    {
        // explode from comma separated string
        $item_ids = explode(',', $request->items);
        $user = auth('sanctum')->user();

        $items = Product::whereIn('_id', $item_ids)->get();
        $ordered_items = [];
        $amount = 0;
        foreach ($items as $item) {
            $amount += $item->price;
            $ordered_items[] = [
                'name' => $item->productName,
                'price' => $item->price,
                'quantity' => 1,
                'description' => "$user->_id:$item->_id"
            ];
        }
        
        return $this->pay(new Request([
            'amount' => strval($amount),
            'items' => $ordered_items,
        ]));
    }

    public function success(Request $request)
    {
        if (!$request->input('paymentId') || !$request->input('PayerID')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed.',
            ]);
        }

        $response = $this->gateway->completePurchase([
            'payer_id' => $request->input('PayerID'),
            'transactionReference' => $request->input('paymentId'),
        ])->send();

        if (!$response->isSuccessful()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed.',
                'data' => $response->getData(),
            ]);
        }

        $data = $response->getData();
        $product = $data['transactions'][0]['item_list']['items'];
        $user_id = explode(':', $product[0]['description'])[0];
        $user = User::find($user_id);
        $products = [];

        if (!$user->products) {
            $user->products = [];
        }
        foreach ($product as $item) {
            $product_id = explode(':', $item['description'])[1];
            $product = Product::find($product_id);
            $products[] = [
                'product_id' => $product->_id,
                'product_name' => $product->productName,
                'price' => $product->price,
            ];
        }

        $user->products = array_merge($user->products, $products);
        $user->save();

        return redirect('http://localhost:5173/success');
    }

    public function paymentSignUp(Request $request)
    {
        // Retrieve the authenticated user
        $user = request()->user();

        // Validate the payment details
        $request->validate([
            'line' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'card_number' => ['required', 'string', 'max:255'],
            'expire_date' => ['required', 'string', 'max:255'],
            'cvv' => ['required', 'string', 'max:255'],
        ]);

        // Update the user's payment details
        $user->update([
            'address' => [
                'line' => $request->line,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
                'country' => $request->country,
            ],
        ]);

        $this->AddpaymentMethod($request);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment details added successfully',
        ]);
    }

    public function AddpaymentMethod(Request $request)
    {
        // Retrieve the authenticated user
        $user = request()->user();

        // Validate the payment method
        $request->validate([
            'card_number' => ['required', 'string', 'max:255'],
            'card_type' => ['required', 'string', 'max:255'],
            'expire_date' => ['required', 'string', 'max:255'],
            'cvv' => ['required', 'string', 'max:255'],
        ]);

        // Update the user's payment method
        $user->push(
            'payment',
            [
                'id' => uniqid(),
                'card_number' => $request->card_number,
                'card_type' => $request->card_type,
                'expire_date' => $request->expire_date,
                'cvv' => $request->cvv,
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method add successfully',
        ]);
    }

    public function DeletepaymentMethod(Request $request)
    {
        // Retrieve the authenticated user
        $user = $request->user();

        $user->payment = array_values(array_filter($user->payment, function ($payment) use ($request) {
            return $payment['id'] !== $request->id;
        }));

        // Save the changes to the user
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method deleted successfully',
        ]);
    }

    public function EditpaymentMethod(Request $request, $id)
    {
        // Retrieve the authenticated user
        $user = request()->user();
        $payment = $user->payment;

        // Check if the payment method exists
        if ($payment == null || empty($payment)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment method not found.',
            ], 404);
        }
        $method = null;
        foreach ($payment as $key => $payment) {
            if ($payment['id'] == $id) {
                $method = $payment;
                break;
            }
        }
        if ($method == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'Payment method not found',
            ], 404);
        }

        // Update the payment method
        $user->raw()->updateOne(
            ['email' => $user->email],
            ['$set' => [
                'payment.$[elem].cvv' => $request->cvv,
                'payment.$[elem].expire_date' => $request->expire_date,
            ]],
            ['arrayFilters' => [['elem.id' => $id]]]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Payment method Update successfully',
            'user' => $user,
            'method' => $method,
        ]);
    }
}
