import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, Diagnosa, Pasien } from '@/types'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: 'Rekam Medis', 
    href: '/rekam-medis' 
  },
]

const index = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
  const [pasien, setPasien] = useState<Pasien>();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Rekam Medis" />
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Rekam Medis</h1>
        <p className="mt-2 text-sm text-muted-foreground">Halaman rekam medis pasien.</p>
      
      </div>
    </AppLayout>
  )
}

export default index