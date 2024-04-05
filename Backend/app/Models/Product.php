<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'productName',
        'description',
        'category',
        'sort_by',
        'qty',
        'sku',
        'weight',
        'length',
        'breadth',
        'width',
        'price',
        'discount',
        'color',
        'product_img',
        'is_hidden',
    ];

    // protected $casts = [
    //     'product_img' => 'array',
    // ];
}
