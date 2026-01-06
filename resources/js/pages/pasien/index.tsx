import CustomPagination from '@/components/custom-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Pasien } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

const breadcumbs: BreadcrumbItem[] = [
  { title: 'Data Pasien', href: '/data-pasien' },
]

const Index = () => {

  const {pasiens}: any = usePage().props

  useEffect(() => {
    console.log(pasiens);
  }, []);


  return (
    <AppLayout breadcrumbs={breadcumbs}>
      <Head title="Data Pasien" />
      <Table>
        <TableHeader>
          <TableHead className='w-10 text-center'>No</TableHead>
          <TableHead>Nomor Pasien</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead className='w-32 text-center'>Opsi</TableHead>
        </TableHeader>
        <TableBody>
          {pasiens.data.map((pasien: Pasien, index: number) => (
            <TableRow key={pasien.id}>
              <TableCell className='w-10 text-center'>{index + 1}</TableCell>
              <TableCell>{pasien.nomor_pasien}</TableCell>
              <TableCell>{pasien.nama_lengkap}</TableCell>
              <TableCell>{pasien.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</TableCell>
              <TableCell>{pasien.usia}</TableCell>
              <TableCell className='w-32 text-center'>Edit | Hapus</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <CustomPagination />
      </div>
    </AppLayout>
  )
}

export default Index