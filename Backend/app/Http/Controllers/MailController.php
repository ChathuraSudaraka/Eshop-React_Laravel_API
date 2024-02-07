<?php

namespace App\Http\Controllers;

use App\Mail\ForgetPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public static function forgotPassword($data) {
        Mail::to($data['email'])->send(new ForgetPasswordMail($data));
    }
}
