<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiagnosaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pasien_id' => 'required|exists:pasiens,id',
            'keluhan' => 'required',
            'diagnosa' => 'required',
            'tindakan' => 'required',
            'obat' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'pasien_id.required' => 'Pasien harus dipilih.',
            'pasien_id.exists' => 'Pasien tidak ditemukan.',
            'keluhan.required' => 'Keluhan harus diisi.',
            'diagnosa.required' => 'Diagnosa harus diisi.',
            'tindakan.required' => 'Tindakan harus diisi.',
            'obat.required' => 'Obat harus diisi.',
        ];
    }
}
