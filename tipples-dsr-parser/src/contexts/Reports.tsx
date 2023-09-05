import { ReactNode, createContext, useState } from 'react'
import { Reports } from '../util/interfaces'
import { generateReportDate } from '../util/shared'

export const ReportContext = createContext<any | null>(null)

const ReportContextProvider = ({ children }: { children: ReactNode }) => {
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
    let parsedReports: Reports = {}
    files.forEach((file) => {
      let mappedCsv = cleanReport(file)
      let reportDate = generateReportDate(mappedCsv).toString()
      parsedReports[reportDate] = mapReport(mappedCsv)
    })
    setReports(parsedReports)
    setSelectedReport(Object.keys(parsedReports)[0])
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
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

export default ReportContextProvider
