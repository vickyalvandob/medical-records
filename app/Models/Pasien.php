<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeImmutable;
use Throwable;

class Pasien extends Model
{
    /** @use HasFactory<\Database\Factories\PasienFactory> */
    use HasFactory;
    protected $fillable = [
        'nomor_pasien',
        'nama_lengkap',
        'alamat',
        'nomor_telepon',
        'jenis_kelamin',
        'tanggal_lahir',
        'golongan_darah',
        'pekerjaan',
        'nomor_ktp',
    ];

    public static function nomorPasien(){
        $maxId = self::max('id');
        $kode = sprintf("%04d", $maxId ? $maxId + 1 : 1);
        return 'PSN-' . date('Y') . $kode;
    }

    public static function getUsia($tanggalLahir){
        if (empty($tanggalLahir)) {
            return null;
        }

        try {
            $tgl = new DateTimeImmutable($tanggalLahir);
            $now = new DateTimeImmutable();

            $usia = $now->diff($tgl);

            return "{$usia->y} Tahun {$usia->m} Bulan {$usia->d} Hari";
        } catch (Throwable $e) {
            return null;
        }

    }

    protected static function booted(){

        static::creating(function ($pasien) {
            $pasien->nomor_pasien = self::nomorPasien();
        });


    }
}
