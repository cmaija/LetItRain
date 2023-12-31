import { NonCashPayments } from './interfaces'

export function calculateChecking(nonCashPayments: NonCashPayments): number {
  return Object.keys(nonCashPayments)
    .filter(
      (key) =>
        key !== 'OT' &&
        key !== 'Redeem PDR' &&
        key !== 'Checking' &&
        key !== 'PPD Revenue'
    )
    .reduce((acc, key) => acc + nonCashPayments[key], 0)
}

export function calculatePPDRevenue(nonCashPayments: NonCashPayments): number {
  return Object.keys(nonCashPayments)
    .filter((key) => key === 'OT' || key === 'Redeem PDR')
    .reduce((acc, key) => acc + nonCashPayments[key], 0)
}

export function parseNonCashPayments(
  csv: string[][],
  compsEnd: number
): {
  nonCashPayments: NonCashPayments
  nonCashPaymentsSectionEnd: number
} {
  if (!csv || !csv.length)
    return {
      nonCashPayments: {
        Checking: 0,
        ['PPD Revenue']: 0,
      },
      nonCashPaymentsSectionEnd: -1,
    }
  let nonCashPayments: NonCashPayments = {
    Checking: 0,
    ['PPD Revenue']: 0,
  }
  let nonCashPaymentsHeaderIdx = csv.findIndex((row, index) => {
    if (
      index > compsEnd &&
      row.includes('Amount') &&
      row.includes('Charge Tips')
    ) {
      return true
    }
  })

  let nonCashPaymentsRangeEndIdx = csv.findIndex((row, index) => {
    if (
      index > nonCashPaymentsHeaderIdx &&
      row.some((value) => /^-+$/g.test(value))
    ) {
      return true
    }
  })
  let amountHeaderIdx = csv[nonCashPaymentsHeaderIdx].findIndex(
    (header) => header === 'Amount'
  )

  let quantityHeaderIdx = csv[nonCashPaymentsHeaderIdx].findIndex(
    (header) => header === 'Qty'
  )

  csv
    .slice(nonCashPaymentsHeaderIdx + 1, nonCashPaymentsRangeEndIdx)
    .forEach((row) => {
      if (row[quantityHeaderIdx - 1].length > 1) {
        nonCashPayments[row[quantityHeaderIdx - 1]] = parseFloat(
          row[amountHeaderIdx]
        )
      }
    })

  nonCashPayments['Checking'] = calculateChecking(nonCashPayments)
  nonCashPayments['PPD Revenue'] = calculatePPDRevenue(nonCashPayments)

  return {
    nonCashPayments,
    nonCashPaymentsSectionEnd: nonCashPaymentsRangeEndIdx,
  }
}
