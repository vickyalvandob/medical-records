<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Pasien;
use App\Models\Diagnosa;
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

    public function getDataPasienJson(){
        $search = request()->query('search', '');
        $query = Pasien::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nomor_pasien', 'like', "%{$search}%")
                ->orWhere('nama_lengkap', 'like', "%{$search}%");
            });
        }
        $query->orderBy('nama_lengkap', 'asc');
        $pasiens = $query->get()->map(function($pasien){
            return [
                'label' => $pasien->nomor_pasien . ' - ' . $pasien->nama_lengkap,
                'value' => $pasien->id,
            ];
        });
        return response()->json($pasiens);
    }

    public function getRekamMedis($pasien_id)
    {
        $limit = request()->query('limit');
        $query = Diagnosa::where('pasien_id', $pasien_id)
        ->orderBy('created_at', 'desc');

        if($limit){
            $query->limit($limit);
        }

        $rekamMedis = $query->get()->map(function($diagnosa){
          $diagnosa->tanggal_periksa = Carbon::parse($diagnosa->created_at)->locale('id')->translatedFormat('l, d F Y');
          return $diagnosa;
        });
        return response()->json($rekamMedis);
    }

    public function show($pasien_id)
    {
        $query = Pasien::with('diagnosa')->findOrFail($pasien_id);
        $pasien = PasienResource::make($query);
        return response()->json($pasien);
    }
}
