import { findRowIdx, parseCol } from './shared'

export interface Tips {
  'Charge Tips': number
  AutoGratuity: number
  total: number
}

export function parseTips(csv: string[][]): Tips | undefined {
  if (!csv || !csv.length) return
  const tipsByPaymentTypeTitleIdx = findRowIdx(csv, (row: string[]) =>
    row.includes('Tips by Payment Type')
  )

  const tipsCategoriesHeaderIdx = findRowIdx(
    csv,
    (row: string[]) => row.includes('Payment Type'),
    tipsByPaymentTypeTitleIdx
  )

  const chargeTipsColIdx = parseCol(csv[tipsCategoriesHeaderIdx], 'Charge Tips')
  const autoGratTipsColIdx = parseCol(
    csv[tipsCategoriesHeaderIdx],
    'AutoGratuity'
  )

  const totalsRowIdx = findRowIdx(
    csv,
    (row: string[]) => row.includes('Total'),
    tipsCategoriesHeaderIdx
  )

  return {
    'Charge Tips': parseFloat(csv[totalsRowIdx][chargeTipsColIdx]),
    AutoGratuity: parseFloat(csv[totalsRowIdx][autoGratTipsColIdx]),
    total:
      parseFloat(csv[totalsRowIdx][chargeTipsColIdx]) +
      parseFloat(csv[totalsRowIdx][autoGratTipsColIdx]),
  }
}
