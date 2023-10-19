<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    //
    public function index()
    {
        $data = [
            'allSensor' => Sensor::all(),
            'sensor1' => Sensor::where('name', 'sensor1')->latest()->first(),
            'sensor2' => Sensor::where('name', 'sensor2')->latest()->first(),
            'sensor3' => Sensor::where('name', 'sensor3')->latest()->first(),
        ];

        return Inertia::render('Welcome', $data);
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
            'sensor' => Sensor::where('name', $slug)->latest('id')->take(7)->get(),
        ];

        return response()->json($data);
    }
}
