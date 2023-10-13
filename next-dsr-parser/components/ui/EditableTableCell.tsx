import { useState, useRef, useEffect } from 'react'
import {
  Pencil1Icon,
  Cross1Icon,
  CheckIcon,
  ResetIcon,
} from '@radix-ui/react-icons'
import { Button } from './Button'
import { cn } from '@/lib/style'
import { convertToMoneyString } from '@/lib/shared'
import { Input } from './Input'

interface Props {
  value: string | number
  onChange: (value: string | number) => void
  onClickUndo: () => void
  className?: string
  colSpan?: number
}
export default function EditableTableCell({
  value,
  onChange,
  onClickUndo,
  className,
  colSpan = 1,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [temporaryNewValue, setTemporaryNewValue] = useState<string | number>(
    value
  )

  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleToggleEditing() {
    setIsEditing(true)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  useEffect(() => {
    setTemporaryNewValue(value)
  }, [value])

  function handleSaveValue() {
    if (value !== temporaryNewValue) {
      onChange(temporaryNewValue || 0)
    }
    setIsEditing(false)
  }

  function handleCancelEdit() {
    setTemporaryNewValue(value)
    setIsEditing(false)
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    // if it's the enter key, save the value, if its an escape key, cancel the edit
    if (e.key === 'Enter') {
      handleSaveValue()
    }
    if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const buttonStyles = 'w-7 h-7'

  return (
    <td
      colSpan={colSpan}
      className={cn('border-slate-500 border px-3 py-2', className)}
    >
      <div className="flex flex-row items-center justify-end max-w-full min-h-[2.5rem]">
        {isEditing ? (
          <div className="flex flex-row items-center justify-end">
            <Input
              type="number"
              value={temporaryNewValue}
              onChange={(e) => setTemporaryNewValue(e.target.value)}
              onKeyDown={handleKeydown}
              ref={inputRef}
              className="text-right mr-1 box-border max-w-[6rem]"
            />
            <Button
              variant="ghost"
              size="icon"
              title="save"
              className={buttonStyles}
              onClick={handleSaveValue}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="cancel editing"
              onClick={handleCancelEdit}
              className={buttonStyles}
            >
              <Cross1Icon />
            </Button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-end">
            <span className="mr-1">{convertToMoneyString(value)}</span>
            <Button
              variant="ghost"
              size="icon"
              title="edit"
              onClick={handleToggleEditing}
              className={buttonStyles}
            >
              <Pencil1Icon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="revert"
              onClick={onClickUndo}
              className={buttonStyles}
            >
              <ResetIcon />
            </Button>
          </div>
        )}
      </div>
    </td>
  )
}
