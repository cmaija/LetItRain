import Papa, { ParseResult } from 'papaparse'
import { useState } from 'react'

interface Props {
  onCompleteUpload: (file: string[]) => void
}

function FileUploader({ onCompleteUpload }: Props) {
  const [file, setFile] = useState<File>()
  function handleCompleteUpload(results: string[]) {
    onCompleteUpload(results)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files) setFile(event.target.files[0])
  }

  function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        delimiter: ',',
        newline: '\r',
        complete: (results: ParseResult<string>) => {
          handleCompleteUpload(results.data)
        },
      })
    }
  }

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Report</button>
    </>
  )
}

export default FileUploader
