import EditableTableCell from '@/components/ui/EditableTableCell'
import { Tips } from '@/lib/interfaces'
import { convertToMoneyString } from '@/lib/shared'
import { useState } from 'react'

interface Props {
  tips: Tips
  onChangeTips: (tips: Tips) => void
}
export default function TipsTable({ tips, onChangeTips }: Props) {
  const [originalTips] = useState<Tips>(structuredClone(tips))

  function handleUpdateChargeTips(value: number | string) {
    let newTips = structuredClone(tips)
    newTips['Charge Tips'] =
      typeof value === 'string' ? parseFloat(value) : value
    newTips['total'] = newTips['Charge Tips'] + newTips['AutoGratuity']
    onChangeTips(newTips)
  }

  function handleUpdateAutoGratuity(value: number | string) {
    let newTips = structuredClone(tips)
    newTips['AutoGratuity'] =
      typeof value === 'string' ? parseFloat(value) : value
    newTips['total'] = newTips['Charge Tips'] + newTips['AutoGratuity']
    onChangeTips(newTips)
  }

  function handleUndoChargeTips() {
    let newTips = structuredClone(tips)
    newTips['Charge Tips'] = originalTips['Charge Tips']
    newTips['total'] = newTips['Charge Tips'] + newTips['AutoGratuity']
    onChangeTips(newTips)
  }

  function handleUndoAutoGratuity() {
    let newTips = structuredClone(tips)
    newTips['AutoGratuity'] = originalTips['AutoGratuity']
    newTips['total'] = newTips['Charge Tips'] + newTips['AutoGratuity']
    onChangeTips(newTips)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Charge Tips</th>
            <th>Auto Gratuity</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tips</td>
            <EditableTableCell
              value={tips['Charge Tips']}
              onChange={handleUpdateChargeTips}
              onClickUndo={handleUndoChargeTips}
              className="min-w-[15rem]"
            />
            <EditableTableCell
              value={tips['AutoGratuity']}
              onChange={handleUpdateAutoGratuity}
              onClickUndo={handleUndoAutoGratuity}
              className="min-w-[15rem]"
            />
            <td className="text-right">
              {convertToMoneyString(tips['total'])}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
