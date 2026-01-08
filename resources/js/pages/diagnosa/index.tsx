import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Diagnosa } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Label } from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { toast } from 'sonner'
import RekamMedis from './components/RekamMedis'

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: 'Diagnosa', 
    href: '/diagnosa' 
  },
]

const Index = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
  const {data, setData, post, processing, errors, reset, clearErrors} = useForm({
    pasien_id: '',
    keluhan: '',
    tindakan: '',
    diagnosa: '',
    obat: '',
  });

  const getPasien = async (inputValue:string) => {
    if(!inputValue) return [];
    setLoading(true);

    try {
      const {data} = await axios.get('/data-pasien/get-json', {
        params: {
          search: inputValue,
        }
      });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error('Gagal memuat data pasien');
      return [];
    }
  };

  const getDataDiagnosa = async (inputValue:string) => {
    if(!inputValue) return [];
    setLoading(true);

    try {
      const {data} = await axios.get(`/data-pasien/${inputValue}/rekam-medis?limit=5`)
      setDiagnosa(data)
    } catch (error) {
      setLoading(false);
      toast.error('Gagal memuat data diagnosa');
      return [];
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      post('/diagnosa', {
        onSuccess: () => {
          reset()
          clearErrors()

          const reactSelect = document.getElementById('react-async-select') as HTMLSelectElement;
          reactSelect.value = '';
        },
      });
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirim data');
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Diagnosa" />
      <div className="grid grid-cols-12 gap-5 p-4">
       <Card className="col-span-6">
          <form onSubmit={handleSubmit} className='space-y-3'>
            <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Form Diagnosa</CardTitle>
              <Button disabled={processing}>Simpan Diagnosa</Button>
            </CardHeader>
            <CardContent>
              <div className='mb-2'>
                <AsyncSelect 
                  cacheOptions
                  defaultOptions
                  loadOptions={getPasien}
                  isClearable
                  placeholder="Pilih Pasien..."
                  isLoading={loading}
                  noOptionsMessage={() => 'Pasien tidak ditemukan'}
                  loadingMessage={() => 'Memuat data pasien..'}
                  onChange={(selectedOption:any) => {
                    setData('pasien_id', selectedOption?.value)
                    getDataDiagnosa(selectedOption?.value)
                  }}
                  unstyled
                  classNamePrefix="react-select"
                  className="react-select-container"
                  id='react-async-select'
                />
              </div>
              <div>
                <Label>Keluhan</Label>
                <Textarea 
                  className="min-h-32 mt-2" 
                  value={data.keluhan}
                  onChange={(e) => setData('keluhan', e.target.value)}
                />
                <InputError message={errors.keluhan} className="mt-2" />
              </div>
              <div>
                <Label className="mt-4">Diagnosa</Label>
                <Textarea 
                  className="min-h-32 mt-2" 
                  value={data.diagnosa}
                  onChange={(e) => setData('diagnosa', e.target.value)}
                />
                <InputError message={errors.diagnosa} className="mt-2" />
              </div>
              <div>
                <Label className="mt-4">Tindakan</Label>
                <Textarea 
                  className="min-h-32 mt-2" 
                  value={data.tindakan}
                  onChange={(e) => setData('tindakan', e.target.value)}
                />
                <InputError message={errors.tindakan} className="mt-2" />
              </div>
              <div>
                <Label className="mt-4">Obat</Label>
                <Textarea 
                  className="min-h-32 mt-2" 
                  value={data.obat}
                  onChange={(e) => setData('obat', e.target.value)}
                />
                <InputError message={errors.obat} className="mt-2" />
              </div>
            </CardContent>  
          </form>
       </Card>
       <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Riwayat Diagnosa Pasien</CardTitle>
          <CardDescription>Menampilkan 5 riwayat diagnosa terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <RekamMedis diagnosa={diagnosa} />
        </CardContent>
       </Card>
      </div>
    </AppLayout>
  )
}

export default Index