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

export default function CreatePeriodButton() {
  const { periodName, setPeriodName, date, setDate } = useContext(ReportContext)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleUploadSuccess(id: string) {
    setOpen(false)
    router.push(`/period/${id}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Add New Period</DialogTrigger>
      <DialogContent>
        <DialogHeader>Add New Period</DialogHeader>
        <Input
          placeholder="P10 1 of 1"
          value={periodName}
          onChange={(e) => setPeriodName(e.target.value)}
        />
        <FileUploader onSuccess={handleUploadSuccess} />
        <DateRangePicker date={date} setDate={setDate} />
      </DialogContent>
    </Dialog>
  )
}
