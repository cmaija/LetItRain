import { Comps } from './interfaces'

function findCompsRangeEndIdx(csv: string[][], compsStartRow: number): number {
  return csv.findIndex((row, index) => {
    return index >= compsStartRow && row.some((value) => /^-+$/g.test(value))
  })
}

function findCompsRangeStartIdx(
  csv: string[][],
  compsStartRow: number
): number {
  return csv.findIndex((row, index) => {
    return (
      index >= compsStartRow &&
      row.some((value) => value.toLowerCase() === 'comps')
    )
  })
}

export function parseComps(
  csv: string[][],
  totalsEnd: number
): { comps: Comps; compsSectionEnd: number } {
  let comps: Comps = {}
  let compsStart = findCompsRangeStartIdx(csv, totalsEnd)
  let compsEnd = findCompsRangeEndIdx(csv, compsStart)

  let compsRange = csv.slice(compsStart, compsEnd)
  let compsHeadersIdx = compsRange.findIndex(
    (row) => row.includes('Qty') && row.includes('Amount')
  )

  let quantityHeaderIdx = compsRange[compsHeadersIdx].findIndex(
    (header) => header.toLowerCase() === 'qty'
  )
  let amountHeaderIdx = compsRange[compsHeadersIdx].findIndex(
    (header) => header.toLowerCase() === 'amount'
  )

  let compsCategoriesRange = compsRange.slice(compsHeadersIdx + 1, compsEnd)
  compsCategoriesRange.forEach((category: string[]) => {
    if (category[quantityHeaderIdx - 1].length > 1) {
      comps[category[quantityHeaderIdx - 1]] = parseFloat(
        category[amountHeaderIdx]
      )
    }
  })
  return { comps, compsSectionEnd: compsEnd }
}
