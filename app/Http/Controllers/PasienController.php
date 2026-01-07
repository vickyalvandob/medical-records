<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pasien;
use Illuminate\Http\Request;
use App\Http\Resources\PasienResource;
use App\Http\Requests\PasienStoreRequest;

class PasienController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 10);
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

    public function store(PasienStoreRequest $request)
    {
        Pasien::create($request->all());

        return redirect()->to(route('pasien.index'))->with('success', 'Data pasien berhasil ditambahkan.');
    }

    public function update(PasienStoreRequest $request, $pasien_id)
    {
        $pasien = Pasien::findOrFail($pasien_id);
        $pasien->update($request->all());
        return redirect()->to(route('pasien.index'))->with('success', 'Data pasien berhasil diperbarui.');
    }

    public function destroy($pasien_id)
    {
        $pasien = Pasien::findOrFail($pasien_id);
        $pasien->delete();
        return redirect()->to(route('pasien.index'))->with('success', 'Data pasien berhasil dihapus.');
    }
}
