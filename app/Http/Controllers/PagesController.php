<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{
    //
    public function index()
    {
        $data = [
            'allSensor' => Sensor::all(),
            'base_url' => env('APP_URL'),
            'sensor1' => Sensor::where('name', 'sensor1')->orderBy('id', 'desc')->latest()->first(),
            'sensor2' => Sensor::where('name', 'sensor2')->orderBy('id', 'desc')->latest()->first(),
            'sensor3' => Sensor::where('name', 'sensor3')->orderBy('id', 'desc')->latest()->first(),
        ];

        return Inertia::render('Welcome', $data);
    }

    public function login()
    {
        $data = [
            'base_url' => env('APP_URL'),
        ];
        return Inertia::render("Login", $data);
    }
    public function authlogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('admin');
        }
        return back()->with('Periksa Kembali Email dan Password');
    }
    public function admin()
    {
        $data = [
            'base_url' => env('APP_URL'),
        ];
        return Inertia::render("Admin", $data);
    }

    public function allData($slug)
    {
        // dd($slug);
        $data = [
            'sensor' => Sensor::where('name', $slug)->orderBy('id', 'desc')->get(),
        ];

        return response()->json($data);
    }
    public function minData($slug)
    {
        // dd($slug);
        $data = [
            'sensor' => Sensor::where('name', $slug)->orderBy('id', 'desc')->take(7)->get(),
        ];

        return response()->json($data);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login'); // Redirect ke halaman login setelah logout
    }
}
