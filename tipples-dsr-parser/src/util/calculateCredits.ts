import { TotalSales, TotalsByCategory } from './interfaces'
import { CashData } from './parseCash'
import { Tips } from './parseTips'

export function calculateCredits(input: {
  salesCategoryData: TotalsByCategory | undefined
  taxes: number | undefined
  tips: Tips | undefined
  cashData: CashData | undefined
}): number {
  let extrasCash = 0
  if (input.cashData && input.cashData.extraCash < 0) {
    extrasCash = input.cashData.extraCash
  }

  let salesTotal = input.salesCategoryData
    ? Object.values(input.salesCategoryData).reduce(
        (acc: number, category: TotalSales) => acc + category.total,
        0
      )
    : 0

  return salesTotal + (input.taxes || 0) + (input.tips?.total || 0) + extrasCash
}
