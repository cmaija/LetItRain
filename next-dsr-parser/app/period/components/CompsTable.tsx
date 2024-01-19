'use client'
import EditableTableCell from '@/components/ui/EditableTableCell'
import { Comps } from '@/lib/interfaces'
import { convertToMoneyString } from '@/lib/shared'
import { useState } from 'react'

interface Props {
  comps: Comps
  onChangeComps: (comps: Comps) => void
}
export default function CompsTable({ comps, onChangeComps }: Props) {
  const [originalComps] = useState<Comps>(structuredClone(comps))
  function updateComp(value: number | string, comp: string) {
    let newComps = structuredClone(comps)
    newComps[comp] = typeof value === 'string' ? parseFloat(value) : value

    onChangeComps(newComps)
  }

  function undoUpdateComp(comp: string) {
    let newComps = structuredClone(comps)
    newComps[comp] = originalComps[comp]
    onChangeComps(newComps)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Comp Account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(comps).map((item) => (
            <tr key={item}>
              <td>{item}</td>
              <EditableTableCell
                value={comps[item]}
                onChange={(value) => updateComp(value, item)}
                onClickUndo={() => undoUpdateComp(item)}
                className="text-left min-w-[15rem]"
              />
            </tr>
          ))}
          <tr>
            <td>Total Comps</td>
            <td className="text-right pr-[4.5rem]">
              {convertToMoneyString(
                Object.values(comps).reduce((acc, curr) => acc + curr, 0)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
