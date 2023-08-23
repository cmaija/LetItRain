export interface TotalsByCategory {
  [key: string]: TotalSales
}
export interface TotalSales {
  netSales: number
  comps: number
  taxes: number
  total: number
}
