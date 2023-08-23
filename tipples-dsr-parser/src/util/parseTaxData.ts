import { parseCol, parseSalesByCategoryIdx } from './parseSalesCategoryData'

export function findSalesCategoriesTotalIdx(
  csv: string[][],
  salesCategoriesRangeStart?: number
): number {
  let rangeStart = 0
  if (!salesCategoriesRangeStart) {
    rangeStart = parseSalesByCategoryIdx(csv) || 0
  } else {
    rangeStart = salesCategoriesRangeStart
  }

  if (rangeStart) {
    return csv.findIndex((row, index) => {
      if (index > rangeStart && row.includes('Totals')) {
        return true
      }
    })
  }

  return -1
}
export function parseTaxData(
  csv: string[][]
): { taxes: number | undefined; taxesSectionEnd: number } | undefined {
  if (!csv || !csv.length) return
  const salesCategoriesRangeStart = parseSalesByCategoryIdx(csv)
  if (!salesCategoriesRangeStart) return

  const taxCol = parseCol(csv[salesCategoriesRangeStart], 'Taxes')

  let totalsIdx = findSalesCategoriesTotalIdx(csv, salesCategoriesRangeStart)
  let totalsRow = totalsIdx > -1 ? csv[totalsIdx] : undefined

  if (!totalsRow) {
    throw new Error('No totals row found')
  }

  return {
    taxes: parseFloat(totalsRow[taxCol]),
    taxesSectionEnd: totalsIdx + 1,
  }
}
