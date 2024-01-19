import FileUploader from '@/components/ui/FileUploader'
import Thumbnail from './Thumbnail'
import { ReportContext } from '@/contexts/Reports'
import { useContext } from 'react'

export default function ThumbnailGallery() {
  const { reports } = useContext(ReportContext)
  return (
    <div className="min-h-full w-[13rem] bg-slate-800 text-gray-200 text-2xl shadow-inner">
      <div className="flex flex-col justify-start items-center">
        {!!reports &&
          Object.keys(reports)
            .sort((a, b) => (new Date(a) < new Date(b) ? -1 : 1))
            .map((reportDate) => (
              <Thumbnail date={reportDate} key={reportDate} />
            ))}
        {!!(reports && Object.keys(reports).length) && (
          <div className="mt-4">
            <FileUploader icon title="Add new report date" />
          </div>
        )}
      </div>
    </div>
  )
}
