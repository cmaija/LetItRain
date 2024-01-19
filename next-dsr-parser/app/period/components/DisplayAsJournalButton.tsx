'use client'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { JournalTable } from './JournalTable'
import {
  CashData,
  Comps,
  NonCashPayments,
  Tips,
  TotalsByCategory,
} from '@/lib/interfaces'
import { matchDataToAccounts } from '@/lib/matchDataToAccounts'
import { useEffect, useState } from 'react'

interface Props {
  salesByCategory?: TotalsByCategory
  totalTaxes?: number
  comps?: Comps
  nonCashPayments?: NonCashPayments
  tips?: Tips
  cashPayments?: CashData
  date: Date
}

export default function DisplayAsJournalButton(props: Props) {
  const [open, setOpen] = useState(false)
  const [journal, setJournal] = useState<any>()

  useEffect(() => {
    if (props && open) {
      const journal = matchDataToAccounts(props)
      setJournal(journal)
    }
  }, [props, open])

  function formatJournalTitle(date: Date) {
    return `Journal Entry #DSR.${date.getFullYear()}.${new Intl.DateTimeFormat(
      'default',
      { month: '2-digit' }
    ).format(date)}.${new Intl.DateTimeFormat('default', {
      day: '2-digit',
    }).format(date)}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-6 py-4 h-auto">
          <p className="text-2xl font-semibold">View as Journal Entry</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60vw] w-[80vw] h-[90vh] flex flex-col">
        <div className="h-full max-h-full flex flex-col flex-grow">
          <DialogHeader className="flex flex-grow min-h-0">
            <h1 className="font-semibold mb-6 text-2xl">
              {formatJournalTitle(props.date)}
            </h1>
          </DialogHeader>
          <div className="w-full h-full overflow-auto min-h-0 flex flex-col items-center">
            <JournalTable journal={journal} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
