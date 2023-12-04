<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use App\Events\SensorEvent;
use App\Models\Koordinat;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Session;

class SensorController extends Controller
{
    //
    public function index(Request $request)
    {

        if ($request->name && $request->value) {

            $koor = Koordinat::where('name', $request->name)->first();
            $lat = $koor->lat;
            $lng = $koor->lng;
            $data = [
                'name' => $request->name,
                'value' => $request->value,
                'lat' => $lat,
                'lng' => $lng
            ];

            if ($request->value > 140) {
                $data['value'] = 0;
            } else {
                $data['value'] = 140 - $request->value;
            }

            event(new SensorEvent($data));

            if ($request->create == 1) {
                Sensor::create($data);
                return response()->json([
                    'message' => 'send data sensor berhasil',
                    'create' => true,
                    'status' => true,
                    'data' => $data,
                    'sensor' => Sensor::all()
                ]);
            }

            return response()->json([
                'message' => 'send data sensor berhasil',
                'create' => false,
                'status' => true,
                'data' => $data,
            ]);
        }
        return response()->json([
            'message' => 'send data sensor gagal',
            'status' => false,
        ]);
    }
    public function countSensor()
    {
        $data = [
            'sensor1' => Sensor::where('name', 'sensor1')->count(),
            'sensor2' => Sensor::where('name', 'sensor2')->count(),
            'sensor3' => Sensor::where('name', 'sensor3')->count(),
        ];
        return response()->json($data);
    }

    public function allKoordinat()
    {
        $data = [
            'koordinat' => Koordinat::all()
        ];

        return response()->json($data);
    }
    public function koordinat($slug)
    {
        $data = [
            'koordinat' => Koordinat::where('name', $slug)->first(),
        ];

        return response()->json($data);
    }
    public function koordinatUpdate($slug, Request $request)
    {
        $koordinat = Koordinat::where('name', $slug)->first();

        if ($koordinat) {
            // Perbarui koordinat berdasarkan data yang diterima dari permintaan
            $koordinat->update([
                'lat' => $request->latitude,
                'lng' => $request->longitude
            ]);

            return response()->json(
                [
                    'success' => true,
                    'message' => 'Koordinat berhasil diperbarui'
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Koordinat tidak terperbarui'
                ],
                400
            );
        }
    }

    public function deleteSensor(Sensor $sensor)
    {
        $data = [
            'success' => true,
            'message' => 'data berhasil di hapus',
            'sensor' => $sensor
        ];

        Sensor::destroy($sensor->id);

        return response()->json($data);
    }
}
