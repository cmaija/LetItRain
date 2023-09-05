import EditableTableCell from '@/src/components/EditableTableCell'
import { NonCashPayments } from '@/src/util/interfaces'
import {
  calculateChecking,
  calculatePPDRevenue,
} from '@/src/util/parseNonCashPayments'
import { convertToMoneyString } from '@/src/util/shared'
import { cellStyles, cn } from '@/src/util/styles'
import { useState } from 'react'

interface Props {
  nonCashPayments: NonCashPayments
  onChangeNonCashPayments: (e: NonCashPayments) => void
}

export default function NonCashPaymentsTable({
  nonCashPayments,
  onChangeNonCashPayments,
}: Props) {
  const [originalNonCashPayments] = useState<NonCashPayments>(
    structuredClone(nonCashPayments)
  )
  function handleChangePaymentMethodAmount(
    value: number | string,
    paymentMethod: string
  ) {
    let newNonCashPayments = { ...nonCashPayments }
    newNonCashPayments[paymentMethod] =
      typeof value === 'string' ? parseFloat(value) : value
    newNonCashPayments['Checking'] = calculateChecking(newNonCashPayments)
    newNonCashPayments['PPD Revenue'] = calculatePPDRevenue(newNonCashPayments)
    onChangeNonCashPayments(newNonCashPayments)
  }

  function handleUndoChanges(paymentMethod: string) {
    let newNonCashPayments = { ...nonCashPayments }
    newNonCashPayments[paymentMethod] = originalNonCashPayments[paymentMethod]
    newNonCashPayments['Checking'] = calculateChecking(newNonCashPayments)
    newNonCashPayments['PPD Revenue'] = calculatePPDRevenue(newNonCashPayments)
    onChangeNonCashPayments(newNonCashPayments)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="text-left">Payment Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(nonCashPayments).map((item) => {
            if (!item.includes('Checking') && !item.includes('PPD Revenue')) {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <EditableTableCell
                    className="min-w-[15rem]"
                    value={nonCashPayments[item]}
                    onClickUndo={() => handleUndoChanges(item)}
                    onChange={(value) =>
                      handleChangePaymentMethodAmount(value, item)
                    }
                  />
                </tr>
              )
            }
          })}
          <tr>
            <td>Checking</td>
            <td className="text-right pr-[4.5rem]">
              {convertToMoneyString(nonCashPayments['Checking'])}
            </td>
          </tr>
          <tr>
            <td>PPD Revenue</td>
            <td className="text-right pr-[4.5rem]">
              {convertToMoneyString(nonCashPayments['PPD Revenue'])}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
