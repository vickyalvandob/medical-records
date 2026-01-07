import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

import { Button } from '@/components/ui/button'
import { Pasien } from '@/types'
import { EditIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface FormPasienProps {
  pasien?: Pasien
}

const FormPasien = ({ pasien }: FormPasienProps) => {
  const isEdit = Boolean(pasien)
  const [open, setOpen] = useState(false)

  const actionUrl = isEdit
    ? `/data-pasien/${pasien!.id}`
    : '/data-pasien'

  const {
    data,
    setData,
    post,
    put,
    processing,
    errors,
    reset,
    clearErrors,
  } = useForm({
    nama_lengkap: '',
    alamat: '',
    nomor_telepon: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    golongan_darah: '',
    pekerjaan: '',
    nomor_ktp: '',
  })

  /* =========================
     SYNC DATA SAAT EDIT
  ========================= */
  useEffect(() => {
    if (pasien) {
      setData({
        nama_lengkap: pasien.nama_lengkap ?? '',
        alamat: pasien.alamat ?? '',
        nomor_telepon: pasien.nomor_telepon ?? '',
        jenis_kelamin: pasien.jenis_kelamin ?? '',
        tanggal_lahir: pasien.tanggal_lahir ?? '',
        golongan_darah: pasien.golongan_darah ?? '',
        pekerjaan: pasien.pekerjaan ?? '',
        nomor_ktp: pasien.nomor_ktp ?? '',
      })
    } else {
      reset()
    }
  }, [pasien])

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const action = isEdit ? put : post

    action(actionUrl, {
      onSuccess: () => {
        setOpen(false)
        clearErrors()
        reset()
        toast.success(
          isEdit
            ? 'Data pasien berhasil diperbarui'
            : 'Data pasien berhasil ditambahkan'
        )
      },
      onError: () => {
        toast.error('Terjadi kesalahan saat menyimpan data')
      },
    })
  }

  /* =========================
     OPTIONS
  ========================= */
  const jenisKelamin = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ]

  const golonganDarah = ['A', 'B', 'AB', 'O']

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state)
        if (!state) clearErrors()
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={isEdit ? 'outline' : 'default'}
          size={isEdit ? 'icon' : 'default'}
        >
          {isEdit ? <EditIcon size={16} /> : 'Tambah Pasien'}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Pasien</DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Nama */}
              <div>
                <Label>Nama Lengkap</Label>
                <Input
                  required
                  value={data.nama_lengkap}
                  onChange={(e) =>
                    setData('nama_lengkap', e.target.value)
                  }
                />
                <InputError message={errors.nama_lengkap} />
              </div>

              {/* Tanggal Lahir */}
              <div>
                <Label>Tanggal Lahir</Label>
                <Input
                  type="date"
                  required
                  value={data.tanggal_lahir}
                  onChange={(e) =>
                    setData('tanggal_lahir', e.target.value)
                  }
                />
                <InputError message={errors.tanggal_lahir} />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <Label>Jenis Kelamin</Label>

                <RadioGroup
                  value={data.jenis_kelamin}
                  onValueChange={(value) =>
                    setData('jenis_kelamin', value)
                  }
                  className="flex gap-6 mt-2"
                >
                  {jenisKelamin.map((jk) => (
                    <div key={jk.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={jk.value}
                        id={`jk-${jk.value}`}
                      />
                      <Label htmlFor={`jk-${jk.value}`}>
                        {jk.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <InputError message={errors.jenis_kelamin} />
              </div>

              {/* Grid 2 kolom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Golongan Darah */}
                <div>
                  <Label>Golongan Darah</Label>
                  <Select
                    value={data.golongan_darah}
                    onValueChange={(value) =>
                      setData('golongan_darah', value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Pilih golongan darah" />
                    </SelectTrigger>
                    <SelectContent>
                      {golonganDarah.map((gd) => (
                        <SelectItem key={gd} value={gd}>
                          {gd}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.golongan_darah} />
                </div>

                {/* Nomor Telepon */}
                <div>
                  <Label>Nomor Telepon</Label>
                  <Input
                    className="mt-2"
                    value={data.nomor_telepon}
                    onChange={(e) =>
                      setData('nomor_telepon', e.target.value)
                    }
                  />
                  <InputError message={errors.nomor_telepon} />
                </div>

                {/* Pekerjaan */}
                <div>
                  <Label>Pekerjaan</Label>
                  <Input
                    className="mt-2"
                    value={data.pekerjaan}
                    onChange={(e) =>
                      setData('pekerjaan', e.target.value)
                    }
                  />
                  <InputError message={errors.pekerjaan} />
                </div>

                {/* Nomor KTP */}
                <div>
                  <Label>Nomor KTP</Label>
                  <Input
                    className="mt-2"
                    value={data.nomor_ktp}
                    onChange={(e) =>
                      setData('nomor_ktp', e.target.value)
                    }
                  />
                  <InputError message={errors.nomor_ktp} />
                </div>

              </div>


              {/* Alamat */}
              <div>
                <Label>Alamat</Label>
                <Textarea
                  value={data.alamat}
                  onChange={(e) =>
                    setData('alamat', e.target.value)
                  }
                />
                <InputError message={errors.alamat} />
              </div>

              <Button className="w-full" disabled={processing}>
                {isEdit ? 'Update' : 'Simpan'}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FormPasien
