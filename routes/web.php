<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\DiagnosaController;
use App\Http\Controllers\RekamMedisController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('data-pasien')->controller(PasienController::class)->group(function () {
        Route::get('/', 'index')->name('pasien.index');
        Route::post('/', 'store')->name('pasien.store');
        Route::put('/{pasien_id}', 'update')->name('pasien.update');
        Route::delete('/{pasien_id}', 'destroy')->name('pasien.destroy');
        Route::get('/get-json', 'getDataPasienJson')->name('pasien.getDataPasienJson');
        Route::get('{pasien_id}/rekam-medis', 'getRekamMedis')->name('pasien.getRekamMedis');
    });

     Route::prefix('diagnosa')->controller(DiagnosaController::class)->group(function () {
        Route::get('/', 'index')->name('diagnosa.index');
        Route::post('/', 'store')->name('diagnosa.store');
        Route::put('/{diagnosa_id}', 'update')->name('diagnosa.update');
        Route::delete('/{diagnosa_id}', 'destroy')->name('diagnosa.destroy');
    });

    Route::prefix('rekam-medis')->controller(RekamMedisController::class)->group(function () {
        Route::get('/', 'index')->name('rekam-medis.index');
    });
});

require __DIR__.'/settings.php';
