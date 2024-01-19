'use client'
import EditableTableCell from '@/components/ui/EditableTableCell'
import { CashData } from '@/lib/interfaces'
import { calculateExtrasCash } from '@/lib/parseCash'
import { convertToMoneyString } from '@/lib/shared'
import { useState } from 'react'

interface Props {
  cashPayments: CashData
  onChangeCashPayments: (cashPayments: CashData) => void
}
export default function CashPaymentsTable({
  cashPayments,
  onChangeCashPayments,
}: Props) {
  const [originalCashPayments] = useState<CashData>(
    structuredClone(cashPayments)
  )

  function handleUpdateCashTaken(value: number | string) {
    let newCashPayments = structuredClone(cashPayments)
    newCashPayments.cashTaken =
      typeof value === 'string' ? parseFloat(value) : value

    newCashPayments.extraCash = calculateExtrasCash(
      newCashPayments.cashTaken,
      newCashPayments.pettyCash
    )
    onChangeCashPayments(newCashPayments)
  }

  function handleUpdatePettyCash(value: number | string) {
    let newCashPayments = structuredClone(cashPayments)
    newCashPayments.pettyCash =
      typeof value === 'string' ? parseFloat(value) : value

    newCashPayments.extraCash = calculateExtrasCash(
      newCashPayments.cashTaken,
      newCashPayments.pettyCash
    )
    onChangeCashPayments(newCashPayments)
  }

  function handleUndoCashTaken() {
    let newCashPayments = structuredClone(cashPayments)
    newCashPayments.cashTaken = originalCashPayments.cashTaken
    newCashPayments.extraCash = calculateExtrasCash(
      newCashPayments.cashTaken,
      newCashPayments.pettyCash
    )
    onChangeCashPayments(newCashPayments)
  }

  function handleUndoPettyCash() {
    let newCashPayments = structuredClone(cashPayments)
    newCashPayments.pettyCash = originalCashPayments.pettyCash
    newCashPayments.extraCash = calculateExtrasCash(
      newCashPayments.cashTaken,
      newCashPayments.pettyCash
    )
    onChangeCashPayments(newCashPayments)
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cash taken</td>
          <EditableTableCell
            onChange={handleUpdateCashTaken}
            onClickUndo={handleUndoCashTaken}
            value={cashPayments.cashTaken}
            className="min-w-[15rem]"
          />
        </tr>
        <tr>
          <td>Cash Deposits</td>
          <EditableTableCell
            onChange={handleUpdatePettyCash}
            onClickUndo={handleUndoPettyCash}
            value={cashPayments.pettyCash}
            className="min-w-[15rem]"
          />
        </tr>
        <tr>
          <td>Exra Cash</td>
          <td className="text-right pr-[4.5rem]">
            {convertToMoneyString(cashPayments.extraCash)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
