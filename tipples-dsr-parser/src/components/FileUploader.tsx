import Papa, { ParseResult } from 'papaparse'
import { Input } from './Input'
import { useContext, useState } from 'react'
import { Label } from './Label'
import { Button } from './Button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ReportContext } from '../contexts/Reports'

interface Props {
  icon?: boolean
}

function FileUploader({ icon = false }: Props) {
  const { handleCompletedUpload, handleAddUpload } = useContext(ReportContext)
  const [files, setFiles] = useState<File[]>()

  function handleSingleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files) {
      if (files?.length) {
        setFiles([...files, event.target.files[0]])
      } else {
        setFiles([event.target.files[0]])
      }
      handleProcessAddedFile(event.target.files[0])
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files) setFiles(Array.from(event.target.files))
  }

  function processFiles(files: File[]): Promise<string[]>[] {
    let parsedResults: Promise<string[]>[] = []
    files.forEach((file) => {
      parsedResults.push(
        new Promise((resolve, reject) => {
          Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            delimiter: ',',
            newline: '\r',
            complete: (results: ParseResult<string>) => {
              resolve(results.data)
            },
            error: (err, file) => {
              reject(err)
            },
          })
        })
      )
    })
    return parsedResults
  }

  async function handleProcessFiles(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (files && files.length) {
      let parsedFiles = processFiles(files)
      handleCompletedUpload(await Promise.all(parsedFiles))
    }
  }

  async function handleProcessAddedFile(file: File) {
    let parsedFile = processFiles([file])
    handleAddUpload((await Promise.all(parsedFile))[0])
  }

  return (
    <div className="p-2">
      {icon ? (
        <Button size="icon">
          <Label htmlFor="reports" className="relative">
            <Input
              id="reports"
              type="file"
              accept=".csv"
              className="invisible absolute top-0 left-0 w-0 h-0"
              onChange={handleSingleFileChange}
            />
            <PlusIcon className="cursor-pointer" />
          </Label>
        </Button>
      ) : (
        <>
          <div className="flex flex-col items-start">
            <Label htmlFor="reports">
              Upload Reports
              <Input
                id="reports"
                type="file"
                accept=".csv"
                multiple
                onChange={handleFileChange}
              />
            </Label>
          </div>
          <Button
            onClick={handleProcessFiles}
            disabled={!files || files.length === 0}
          >
            Process Files
          </Button>
        </>
      )}
    </div>
  )
}

export default FileUploader
