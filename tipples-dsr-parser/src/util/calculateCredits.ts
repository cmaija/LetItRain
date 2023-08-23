import { TotalSales, TotalsByCategory } from './interfaces'
import { CashData } from './parseCash'
import { Tips } from './parseTips'

export function calculateCredits(input: {
  salesCategoryData: TotalsByCategory
  taxes: number
  tips: Tips
  cashData: CashData
}): number {
  let extrasCash = 0
  if (input.cashData.extraCash < 0) {
    extrasCash = input.cashData.extraCash
  }

  let salesTotal = Object.values(input.salesCategoryData).reduce(
    (acc: number, category: TotalSales) => acc + category.total,
    0
  )

  return salesTotal + input.taxes + input.tips.total + extrasCash
}
