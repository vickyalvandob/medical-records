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
        $perPage = request()->query('per_page', 10);
        $search = request()->query('search', '');
        $query = Pasien::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nomor_pasien', 'like', "%{$search}%")
                ->orWhere('nama_lengkap', 'like', "%{$search}%");
            });
        }

        $query->orderBy('nama_lengkap', 'asc');

        $pasiens = PasienResource::collection($query->paginate($perPage)->withQueryString());

        return Inertia::render('pasien/index', [
            'pasiens' => $pasiens
        ]);
    }
}
