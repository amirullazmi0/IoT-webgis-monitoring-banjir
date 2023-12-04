<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Sensor;
use App\Models\Koordinat;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Sensor::factory(1500)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
        ]);

        Koordinat::insert(
            [
                [
                    'name' => 'sensor1',
                    'lat' => 0.76,
                    'lng' => 113.01,
                ],
                [
                    'name' => 'sensor2',
                    'lat' => 0.82,
                    'lng' => 112.97,
                ],
                [
                    'name' => 'sensor3',
                    'lat' => 0.86,
                    'lng' => 112.93,
                ],
            ]
        );
    }
}