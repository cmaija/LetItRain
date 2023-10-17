'use client'
import { Input } from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

export default function CreatePeriodButton() {
  const [periodName, setPeriodName] = useState('')
  return (
    <Dialog>
      <DialogTrigger>Add New Period</DialogTrigger>
      <DialogContent>
        <DialogHeader>Add New Period</DialogHeader>
        <Input
          placeholder="P10 1 of 1"
          value={periodName}
          onChange={(e) => setPeriodName(e.target.value)}
        />
      </DialogContent>
    </Dialog>
  )
}
