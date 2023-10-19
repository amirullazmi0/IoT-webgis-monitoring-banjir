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
Route::get('/postSensor', [SensorController::class, 'index']);


// API
Route::get('/alldata/{slug}', [PagesController::class, 'allData']);
Route::get('/mindata/{slug}', [PagesController::class, 'minData']);
require __DIR__ . '/auth.php';
