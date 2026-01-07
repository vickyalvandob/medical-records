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
import { toast } from 'sonner'

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
    setLoading(true)

    router.delete(`/data-pasien/${pasienId}`, {
      onSuccess: () => {
        toast.success('Data pasien berhasil dihapus')
      },
      onError: () => {
        toast.error('Gagal menghapus data pasien')
      },
      onFinish: () => {
        setLoading(false)
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
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
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
