import { parseCol, findRowIdx } from './shared'

export function parseTaxData(csv: string[][]): {
  taxes: number
  taxesSectionEnd: number
} {
  if (!csv || !csv.length)
    return {
      taxes: 0,
      taxesSectionEnd: -1,
    }
  const salesCategoriesRangeStart = findRowIdx(csv, (value: string[]) =>
    value.includes('Sales Categories')
  )
  if (!salesCategoriesRangeStart)
    return {
      taxes: 0,
      taxesSectionEnd: -1,
    }

  const taxCol = parseCol(csv[salesCategoriesRangeStart], 'Taxes')

  let totalsIdx = findRowIdx(
    csv,
    (row: string[]) => row.includes('Totals'),
    salesCategoriesRangeStart
  )
  let totalsRow = totalsIdx > -1 ? csv[totalsIdx] : undefined

  if (!totalsRow) {
    throw new Error('No totals row found')
  }

  let taxes = parseFloat(totalsRow[taxCol])

  return {
    taxes: isNaN(taxes) ? 0 : taxes,
    taxesSectionEnd: totalsIdx + 1,
  }
}
