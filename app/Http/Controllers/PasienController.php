<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;
use App\Http\Resources\PasienResource;

class PasienController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 10);
        $query = Pasien::query();

        $query->orderBy('nama_lengkap', 'asc');

        $pasiens = PasienResource::collection($query->paginate($perPage)->withQueryString());

        return Inertia::render('pasien/index', [
            'pasiens' => $pasiens
        ]);
    }
}
