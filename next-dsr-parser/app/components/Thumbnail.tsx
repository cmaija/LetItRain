'use client'
import { ReportContext } from '@/contexts/Reports'
import { cn } from '@/lib/style'
import { useContext } from 'react'

interface Props {
  date: string
}
export default function Thumbnail({ date }: Props) {
  const { selectedReport, setSelectedReport } = useContext(ReportContext)
  return (
    <button
      onClick={() => setSelectedReport(date)}
      className={cn(
        selectedReport === date && 'bg-green-200',
        'w-95% h-10 p-1'
      )}
    >
      <div className="bg-white" />
      <h3>{new Date(date).toLocaleDateString()}</h3>
    </button>
  )
}
