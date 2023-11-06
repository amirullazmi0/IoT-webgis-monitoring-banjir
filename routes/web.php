<?php

use Inertia\Inertia;
use App\Models\Sensor;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PagesController::class, 'index'])->name('home');
Route::get('/login', [PagesController::class, 'login'])->name('login');
Route::post('/login', [PagesController::class, 'authlogin']);
Route::post('/logout', [PagesController::class, 'logout']);


Route::get('/postSensor', [SensorController::class, 'index']);

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [PagesController::class, 'admin'])->name('admin');
    Route::post('/sensor/delete/{sensor:id}', [SensorController::class, 'deleteSensor']);
    Route::post('/koordinat/update/{slug}', [SensorController::class, 'koordinatUpdate']);
});
// API

Route::get('/alldata/{slug}', [PagesController::class, 'allData']);
Route::get('/mindata/{slug}', [PagesController::class, 'minData']);
Route::get('/countSensor', [SensorController::class, 'countSensor']);
Route::get('/koordinat/{slug}', [SensorController::class, 'koordinat']);
Route::get('/allkoordinat', [SensorController::class, 'allKoordinat']);


require __DIR__ . '/auth.php';