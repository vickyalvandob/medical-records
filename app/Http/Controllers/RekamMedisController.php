<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RekamMedisController extends Controller
{
    public function index()
    {
        return inertia('rekam-medis/index');
    }
}
