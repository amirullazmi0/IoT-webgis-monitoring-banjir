<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use App\Events\SensorEvent;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Auth\Events\Validated;

class SensorController extends Controller
{
    //
    public function index(Request $request)
    {

        if ($request->name && $request->value) {

            $data = [
                'name' => $request->name,
                'value' => $request->value
            ];
            event(new SensorEvent($data));

            Sensor::create($data);

            return response()->json([
                'message' => 'send data sensor berhasil',
                'status' => true,
                'data' => $data,
                'sensor'=> Sensor::all()
            ]);
        }
        return response()->json([
            'message' => 'send data sensor gagal',
            'status' => false,
        ]);
    }
}