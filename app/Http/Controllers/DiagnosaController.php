<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Diagnosa;
use Illuminate\Http\Request;
use App\Http\Requests\DiagnosaStoreRequest;

class DiagnosaController extends Controller
{
    public function index()
    {
        return Inertia::render('diagnosa/index');
    }

    public function store(DiagnosaStoreRequest $request)
    {
        $request->merge([
            'dokter' => auth()->user()->name,
        ]);

        Diagnosa::create($request->all());
        return redirect()->to(route('diagnosa.index'))->with('success', 'Data diagnosa berhasil ditambahkan.');
    }
}
