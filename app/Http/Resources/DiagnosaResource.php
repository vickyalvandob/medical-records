<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiagnosaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'dokter' => $this->dokter,
            'keluhan' => $this->keluhan,
            'diagnosa' => $this->diagnosa,
            'tindakan' => $this->tindakan,
            'obat' => $this->obat,
            'tanggal_periksa' => Carbon::parse($this->created_at)->locale('id')->translatedFormat('l, d F Y'),
        ];
    }
}
