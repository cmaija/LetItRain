import { calculateCredits } from '@/lib/calculateCredits'
import {
  JournalEntry,
  JournalRow,
  convertJournalToUsableArray,
} from '@/lib/matchDataToAccounts'
import { convertToMoneyString } from '@/lib/shared'
import { useEffect, useState } from 'react'

interface Props {
  journal: JournalEntry
}
export function JournalTable(props: Props) {
  const [entries, setEntries] = useState<JournalRow[]>()
  const [totals, setTotals] = useState<{ debits: number; credits: number }>({
    debits: 0,
    credits: 0,
  })

  useEffect(() => {
    if (props.journal) {
      setEntries(convertJournalToUsableArray(props.journal))
      setTotals({
        debits: calculateDebits(),
        credits: calculateCredits(),
      })
    }
  }, [props])

  function calculateDebits() {
    let debits = 0
    Object.values(props.journal)?.forEach((value) => {
      if (value && value >= 0) {
        debits += value
      }
    })
    return debits
  }
  function calculateCredits() {
    let credits = 0
    Object.values(props.journal)?.forEach((value) => {
      if (value && value < 0) {
        credits += value * -1
      }
    })
    return credits
  }
  return (
    <div>
      <table className="text-lg">
        <thead>
          <tr>
            <th className="text-left">Account</th>
            <th className="text-right">Debits</th>
            <th className="text-right">Credits</th>
          </tr>
        </thead>
        <tbody>
          {entries &&
            entries.map((entry: JournalRow) => {
              return (
                <tr key={entry.acct}>
                  <td className="py-4 px-6 text-left">
                    {entry.acct + ' ' + entry.name}
                  </td>
                  <td className="py-4 px-6 text-right min-w-[8rem]">
                    {(entry?.value || 0) >= 0
                      ? convertToMoneyString(entry.value || 0)
                      : '0.00'}
                  </td>
                  <td className="py-4 px-6 text-right min-w-[8rem]">
                    {(entry?.value || 0) < 0
                      ? convertToMoneyString((entry.value || 0) * -1)
                      : '0.00'}
                  </td>
                </tr>
              )
            })}
          <tr className="text-lg font-semibold">
            <td className="py-4 px-6 text-left">Total</td>
            <td className="py-4 px-6 text-right">
              {convertToMoneyString(totals.debits)}
            </td>
            <td className="py-4 px-6 text-right">
              {convertToMoneyString(totals.credits)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
