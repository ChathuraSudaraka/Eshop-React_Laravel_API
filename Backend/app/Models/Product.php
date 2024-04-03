<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    protected $fillable = [
        'name',
        'description',
        'category',
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
    ]

}
