import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { router } from '@inertiajs/react'
import { useState } from 'react'

interface Props {
  pasienId: number
  pasienNama: string
}

export default function DeletePasienAlert({
  pasienId,
  pasienNama,
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    if (loading) return

    setLoading(true)

    router.delete(`/data-pasien/${pasienId}`, {
      preserveScroll: true,
      onFinish: () => {
        setLoading(false)
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          disabled={loading}
          aria-label="Hapus pasien"
        >
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pasien</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data pasien
            <span className="font-semibold"> {pasienNama}</span>?
            <br />
            Tindakan ini <b>tidak dapat dibatalkan</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
