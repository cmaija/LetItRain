import { findRowIdx, parseCol, parseColWithTest } from './shared'

export interface CashData {
  cashTaken: number
  pettyCash: number
  extraCash: number
}

export function parseCash(csv: string[][]): CashData {
  if (!csv || !csv.length)
    return {
      cashTaken: 0,
      pettyCash: 0,
      extraCash: 0,
    }

  let cashPaymentsRowIdx = findRowIdx(csv, (row: string[]) =>
    row.includes('Cash Payments')
  )

  let cashPaymentsCol = parseCol(csv[cashPaymentsRowIdx], 'Cash Payments')
  let cashTaken = parseFloat(csv[cashPaymentsRowIdx][cashPaymentsCol + 1])

  let depositSectionStartIdx = findRowIdx(
    csv,
    (row: string[]) => !!row.find((col) => col.includes('(calcualted'))
  )

  let depositOfInterestRowIdx = findRowIdx(
    csv,
    (row: string[]) =>
      !!row.find(
        (col) => col.toLowerCase().includes('deposit') && col.includes(':'),
        depositSectionStartIdx
      )
  )

  let pettyCash = 0
  if (depositOfInterestRowIdx > 0) {
    let depositLabelColIdx = parseColWithTest(
      csv[depositOfInterestRowIdx],
      (col: string) => col.toLowerCase().includes('deposit')
    )
    pettyCash = parseFloat(csv[depositOfInterestRowIdx][depositLabelColIdx + 1])
  }

  let extraCash = cashTaken - pettyCash

  return {
    cashTaken,
    pettyCash,
    extraCash,
  }
}
