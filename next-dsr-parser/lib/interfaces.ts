export interface CashData {
  cashTaken: number
  pettyCash: number
  extraCash: number
}

export interface NonCashPayments {
  [paymentType: string]: number
  Checking: number
  ['PPD Revenue']: number
}

export interface Tips {
  'Charge Tips': number
  AutoGratuity: number
  total: number
}

export interface Comps {
  [compName: string]: number
}

export interface TotalsByCategory {
  [key: string]: TotalSales
}
export interface TotalSales {
  netSales: number
  comps: number
  taxes: number
  total: number
}

export interface DayReport {
  sales?: TotalsByCategory
  taxes?: number
  comps?: Comps
  nonCashPayments?: NonCashPayments
  tips?: Tips
  cashPayments?: CashData
}

export interface Reports {
  [date: string]: string[][]
}
