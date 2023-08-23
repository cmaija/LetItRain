import { CashData } from './parseCash'
import { Comps } from './parseComps'
import { NonCashPayments } from './parseNonCashPayments'

export function calculateDebits(input: {
  nonCashPayments: NonCashPayments
  comps: Comps
  cashData: CashData
}): number {
  let extrasCash = 0
  if (input.cashData.extraCash > 0) {
    extrasCash = input.cashData.extraCash
  }
  let comps = Object.values(input.comps).reduce((acc, comp) => acc + comp, 0)
  return (
    input.nonCashPayments.Checking +
    input.nonCashPayments['PPD Revenue'] +
    comps +
    input.cashData.pettyCash +
    extrasCash
  )
}
