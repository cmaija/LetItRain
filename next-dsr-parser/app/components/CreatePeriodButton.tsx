'use client'
import { Input } from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { useContext, useState } from 'react'
import FileUploader from '@/components/ui/FileUploader'
import { useRouter } from 'next/navigation'
import { ReportContext } from '@/contexts/Reports'
import DateRangePicker from '@/components/ui/DateRangePicker'
import { Button } from '@/components/ui/Button'

export default function CreatePeriodButton() {
  const { periodName, setPeriodName, date, setDate } = useContext(ReportContext)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleUploadSuccess(id: string) {
    setOpen(false)
    router.push(`/period`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="secondary" className="px-6 py-4 h-auto">
          <h1 className="text-2xl font-semibold">
            Generate New Journal Entries
          </h1>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-xl font-semibold">
            Generate New Journal Entries
          </h1>
        </DialogHeader>
        {/* <Input
          placeholder="P10 1 of 1"
          value={periodName}
          onChange={(e) => setPeriodName(e.target.value)}
        /> */}
        <FileUploader onSuccess={handleUploadSuccess} />
        {/* <DateRangePicker date={date} setDate={setDate} /> */}
      </DialogContent>
    </Dialog>
  )
}
