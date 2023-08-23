import { parseCol, findRowIdx } from './shared'

export function parseTaxData(
  csv: string[][]
): { taxes: number | undefined; taxesSectionEnd: number } | undefined {
  if (!csv || !csv.length) return
  const salesCategoriesRangeStart = findRowIdx(csv, (value: string[]) =>
    value.includes('Sales Categories')
  )
  if (!salesCategoriesRangeStart) return

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

  return {
    taxes: parseFloat(totalsRow[taxCol]),
    taxesSectionEnd: totalsIdx + 1,
  }
}
