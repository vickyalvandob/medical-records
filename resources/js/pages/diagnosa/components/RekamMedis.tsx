import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Diagnosa } from '@/types'

interface RekamMedisProps {
  diagnosa:Diagnosa[];
}

const RekamMedis = ({ diagnosa }: RekamMedisProps) => {
  return (
    <div>
      {diagnosa.length > 0 ? (
        <Accordion type="multiple" className="w-full">
          {diagnosa.map((item, index) => (
            <AccordionItem key={index} value={index.toString()} className="border-b">
              <AccordionTrigger className="py-4 flex justify-between items-center">
                <span>{item.tanggal_periksa}</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                  <p><strong>Pemeriksa:</strong> {item.dokter}</p>
                  <p><strong>Keluhan:</strong> {item.keluhan}</p>
                  <p><strong>Diagnosa:</strong> {item.diagnosa}</p>
                  <p><strong>Tindakan:</strong> {item.tindakan}</p>
                  <p><strong>Obat:</strong> {item.obat}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-sm text-muted-foreground">Tidak ada riwayat diagnosa.</p>
      )}
    </div>
  )
}

export default RekamMedis