import FileUploader from '@/components/ui/FileUploader'
import Thumbnail from './Thumbnail'
import { ReportContext } from '@/contexts/Reports'
import { useContext } from 'react'

export default function ThumbnailGallery() {
  const { reports } = useContext(ReportContext)
  return (
    <div className="min-h-full w-[13rem] bg-slate-400 shadow-inner">
      <div className="flex flex-col justify-start gap-4 items-center">
        {Object.keys(reports).map((reportDate) => (
          <Thumbnail date={reportDate} key={reportDate} />
        ))}
        {!!(reports && Object.keys(reports).length) && <FileUploader icon />}
      </div>
    </div>
  )
}
