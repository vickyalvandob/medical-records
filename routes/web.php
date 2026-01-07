<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PasienController;

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
    });
});

require __DIR__.'/settings.php';
