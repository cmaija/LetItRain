'use client'
import { ReactNode, createContext, useState } from 'react'
import { Reports } from '@/lib/interfaces'
import { generateReportDate } from '@/lib/shared'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'

export const ReportContext = createContext<any | null>(null)

const ReportContextProvider = ({ children }: { children: ReactNode }) => {
  const [periodName, setPeriodName] = useState('')
  const [periodId, setPeriodId] = useState('')
  const [date, setDate] = useState<DateRange | undefined>()
  const [reports, setReports] = useState<Reports>({})
  const [selectedReport, setSelectedReport] = useState<string>('')

  function cleanReport(file: string[]): string[][] {
    let filteredJunkOut = file.filter((row: any) => {
      if (Object.keys(row).length === 0) return false
      if (
        Object.keys(row).length === 1 &&
        Object.keys(row)[0].includes(
          '1 - Mr Tipples 39 Fell Street San Francisco, CA  94102 '
        )
      )
        return false
      return true
    })

    let mappedCsv = filteredJunkOut
      .map((item: any) => {
        delete item['1 - Mr Tipples 39 Fell Street San Francisco, CA  94102 ']
        return item
      })
      .filter(
        (item: any) =>
          !Object.values(item).every((item) => item === '' || item === ' ')
      )
    return mappedCsv
  }

  function mapReport(file: string[][]): string[][] {
    return file.map((row: any) => Object.values(row))
  }

  function handleAddUpload(file: string[]) {
    let mappedCsv = cleanReport(file)
    let reportDate = generateReportDate(mappedCsv).toString()
    setReports({
      ...reports,
      [reportDate]: mapReport(mappedCsv),
    })
  }

  async function handleCompletedUpload(files: string[][]) {
    await createNewPeriod()
    let parsedReports: Reports = {}
    for (let file of files) {
      let mappedCsv = cleanReport(file)
      let reportDate = generateReportDate(mappedCsv)
      parsedReports[reportDate.toString()] = mapReport(mappedCsv)
      await persistReport({
        date: reportDate,
        report: mappedCsv,
      })
    }
    setReports(parsedReports)
    setSelectedReport(Object.keys(parsedReports)[0])
  }

  async function createNewPeriod() {
    console.log(periodName, date)
    if (periodName && date?.from && date?.to) {
      // await fetch('/api/periods', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     name: periodName,
      //     start: date.from,
      //     end: date.to,
      //   }),
      // })
    }
  }

  function persistCsvs() {}

  async function persistReport({ date, report }: { date: Date; report: any }) {
    // return await createReport({ date, ...report }, periodId)
  }

  return (
    <ReportContext.Provider
      value={{
        reports,
        setReports,
        selectedReport,
        setSelectedReport,
        handleAddUpload,
        handleCompletedUpload,
        periodName,
        setPeriodName,
        date,
        setDate,
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

export default ReportContextProvider
