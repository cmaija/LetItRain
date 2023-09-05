import { Tips } from './interfaces'
import { findRowIdx, parseCol } from './shared'

export function parseTips(csv: string[][]): Tips {
  let tips: Tips = {
    'Charge Tips': 0,
    AutoGratuity: 0,
    total: 0,
  }
  if (!csv || !csv.length) return tips
  const tipsByPaymentTypeTitleIdx = findRowIdx(csv, (row: string[]) =>
    row.includes('Tips by Payment Type')
  )

  const tipsCategoriesHeaderIdx = findRowIdx(
    csv,
    (row: string[]) => row.includes('Payment Type'),
    tipsByPaymentTypeTitleIdx
  )

  if (tipsCategoriesHeaderIdx === -1) return tips
  if (tipsByPaymentTypeTitleIdx === -1) return tips

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
