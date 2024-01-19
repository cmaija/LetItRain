'use client'

import { useContext } from 'react'
import FileUploader from '@/components/ui/FileUploader'
import EditingPane from './components/EditingPane'
import ThumbnailGallery from './components/ThumbnailGallery'
import { cn } from '@/lib/style'
import { ReportContext } from '@/contexts/Reports'

export default function Upload() {
  const { reports, selectedReport } = useContext(ReportContext)

  const reportClases = ''
  const reportShownClases = 'flex h-full'
  const reportHiddenClasses = 'hidden'

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-[100vw] min-w-full min-h-[100vh] flex flex-row">
        <ThumbnailGallery />
        <div className="flex flex-col mx-auto py-5 w-[78%] max-h-[100vh] overflow-auto">
          {!(reports && Object.keys(reports).length) && <FileUploader />}
          {Object.keys(reports) &&
            Object.keys(reports).map((reportDate) => (
              <div
                className={cn(
                  reportDate === selectedReport
                    ? reportShownClases
                    : reportHiddenClasses
                )}
                key={reportDate}
              >
                <EditingPane
                  report={reports[reportDate]}
                  date={new Date(reportDate)}
                />
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
