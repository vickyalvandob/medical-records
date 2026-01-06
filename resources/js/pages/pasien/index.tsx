import CustomPagination from '@/components/custom-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Pasien } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Search } from "lucide-react"

import { handleChangePerPage } from '@/lib/utils'


const breadcumbs: BreadcrumbItem[] = [
  { title: 'Data Pasien', href: '/data-pasien' },
]

const Index = () => {

  const {pasiens}: any = usePage().props
  const [search, setSearch] = useState('')
  const meta = pasiens.meta
  const path = meta.path

  useEffect(() => {
    console.log(pasiens);
  }, []);

  const searchData = () => {
    router.get(
      path,
      { search, page: 1 },
      { preserveState: true, replace: true }
    )
  }


  const clearSearch = () => {
    setSearch('');
    router.get(
      path,
      { page: 1 },
      { preserveState: true, replace: true }
    );
  }

  return (
    <AppLayout breadcrumbs={breadcumbs}>
      <Head title="Data Pasien" />
      <div className="p-4">
        
      <div className="mb-4 flex items-center justify-between gap-4">
        {/* Search */}
        <form className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Cari nomor pasien / nama"
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="button" variant="secondary" onClick={searchData}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button size={"icon"} variant="outline" onClick={clearSearch}>
            <RefreshCcw size={16} />
          </Button>
        </form>

        {/* Per Page Select */}
        <div className="w-32">
          <Select
            defaultValue="10"
            onValueChange={(value) => handleChangePerPage(Number(value), path)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Per page" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">No</TableHead>
            <TableHead>Nomor Pasien</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Usia</TableHead>
            <TableHead className="w-32 text-center">Opsi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pasiens.data.map((pasien: Pasien, index: number) => (
            <TableRow key={pasien.id}>
              <TableCell className='w-10 text-center'>{meta.from + index}</TableCell>
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
        <CustomPagination meta={meta} />
      </div>
      </div>
    </AppLayout>
  )
}

export default Index