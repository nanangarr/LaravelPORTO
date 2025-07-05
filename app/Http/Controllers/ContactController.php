<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'message' => $request->input('message'),
        ];

        Mail::send([], [], function ($message) use ($data) {
            $message->to('ardiansyahnanang984@gmail.com')
                ->subject('New Collaboration Request')
                ->setBody(
                    "Name: {$data['name']}<br>Email: {$data['email']}<br>Message: {$data['message']}",
                    'text/html'
                );
        });

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
