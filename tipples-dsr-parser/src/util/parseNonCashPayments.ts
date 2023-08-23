export interface NonCashPayments {
  [paymentType: string]: number
}

export function parseNonCashPayments(
  csv: string[][],
  compsEnd: number
): {
  nonCashPayments: NonCashPayments | undefined
  nonCashPaymentsSectionEnd: number
} {
  let nonCashPayments: NonCashPayments = {}
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

  nonCashPayments['Checking'] = Object.keys(nonCashPayments)
    .filter((key) => key !== 'OT' && key !== 'Redeem PDR')
    .reduce((acc, key) => acc + nonCashPayments[key], 0)

  nonCashPayments['PPD Revenue'] = Object.keys(nonCashPayments)
    .filter((key) => key === 'OT' || key === 'Redeem PDR')
    .reduce((acc, key) => acc + nonCashPayments[key], 0)

  return {
    nonCashPayments,
    nonCashPaymentsSectionEnd: nonCashPaymentsRangeEndIdx,
  }
}
