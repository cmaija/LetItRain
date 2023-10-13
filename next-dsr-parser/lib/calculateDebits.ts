import { CashData, Comps, NonCashPayments } from './interfaces'

export function calculateDebits(input: {
  nonCashPayments?: NonCashPayments
  comps?: Comps
  cashData?: CashData
}): number {
  let extrasCash = 0
  if (input.cashData && input.cashData.extraCash > 0) {
    extrasCash = input.cashData.extraCash
  }
  let comps = input.comps
    ? Object.values(input.comps).reduce((acc, comp) => acc + comp, 0)
    : 0
  let checking = input.nonCashPayments ? input.nonCashPayments.Checking : 0
  let ppdRev = input.nonCashPayments ? input.nonCashPayments['PPD Revenue'] : 0
  let pettyCash = input.cashData ? input.cashData.pettyCash : 0
  return checking + ppdRev + comps + pettyCash + extrasCash
}
