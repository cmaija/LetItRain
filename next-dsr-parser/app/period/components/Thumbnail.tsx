'use client'
import { ReportContext } from '@/contexts/Reports'
import { cn } from '@/lib/style'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'

interface Props {
  date: string
}
export default function Thumbnail({ date }: Props) {
  const { selectedReport, setSelectedReport } = useContext(ReportContext)
  return (
    <button
      onClick={() => setSelectedReport(date)}
      title={`View report for date: ${new Date(date).toLocaleDateString()}`}
      className={cn(
        selectedReport === date && 'bg-slate-950 text-white',
        'w-full m-0 py-6 flex flex-row items-center justify-around hover:bg-slate-700 cursor-pointer'
      )}
    >
      <div className="bg-white" />
      <h2>{new Date(date).toLocaleDateString()}</h2>
      <CaretRightIcon
        className={cn(
          'font-bold h-6 w-6',
          selectedReport !== date && 'invisible'
        )}
      />
    </button>
  )
}
