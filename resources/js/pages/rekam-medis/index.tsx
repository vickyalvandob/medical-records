import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Diagnosa, Pasien } from '@/types'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { toast } from 'sonner'
import RekamMedis from '../diagnosa/components/RekamMedis'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Rekam Medis',
    href: '/rekam-medis',
  },
]

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([])
  const [pasien, setPasien] = useState<Pasien>()

  const getPasienOptions = async (inputValue: string) => {
    if (!inputValue) return []

    setLoading(true)

    try {
      const { data } = await axios.get('/data-pasien/get-json', {
        params: { search: inputValue },
      })

      return data
    } catch (error) {
      toast.error('Gagal memuat data pasien')
      return []
    } finally {
      setLoading(false)
    }
  }

  const getPasien = async (inputValue: string) => {
    if (!inputValue) return

    setLoading(true)

    try {
      const { data } = await axios.get(
        `/data-pasien/${inputValue}/show`,
      )
      setPasien(data)
    } catch (error) {
      toast.error('Gagal memuat data pasien')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Rekam Medis" />

      <div className="p-4 space-y-4">
        {/* Select Pasien */}
        <div className="max-w-xl">
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={getPasienOptions}
            isClearable
            placeholder="Cari & pilih pasien..."
            isLoading={loading}
            noOptionsMessage={() => 'Pasien tidak ditemukan'}
            loadingMessage={() => 'Memuat data pasien...'}
            onChange={(selectedOption: any) =>
              getPasien(selectedOption?.value)
            }
            unstyled
            className="react-select-container"
            classNamePrefix="react-select"
            id="react-async-select"
          />
        </div>

          {/* Data Pasien */}
          <Card>
            <CardHeader>
              <CardTitle>Data Pasien</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">
                  Memuat data pasien...
                </p>
              ) : pasien ? (
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <p className="font-semibold">
                    {pasien.nomor_pasien}
                  </p>
                  <p>Nama: {pasien.nama_lengkap}</p>
                  <p>Jenis Kelamin: {pasien.jenis_kelamin}</p>
                  <p>Usia: {pasien.usia} tahun</p>
                  <p>Golongan Darah: {pasien.golongan_darah}</p>
                  <p>Alamat: {pasien.alamat}</p>
                  <p>Nomor Telepon: {pasien.nomor_telepon}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Pilih pasien untuk melihat data pasien
                </p>
              )}
            </CardContent>
          </Card>

          {/* Riwayat Diagnosa */}
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Diagnosa</CardTitle>
            </CardHeader>
            <CardContent>
              <RekamMedis diagnosa={pasien?.diagnosa || []} />
            </CardContent>
          </Card>
      </div>
    </AppLayout>
  )
}

export default Index
