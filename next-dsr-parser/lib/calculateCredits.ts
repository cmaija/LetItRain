import { TotalSales, TotalsByCategory, Tips, CashData } from './interfaces'

export function calculateCredits(input: {
  salesCategoryData: TotalsByCategory | undefined
  taxes: number | undefined
  tips: Tips | undefined
  cashData: CashData | undefined
}): number {
  let extrasCash = 0
  if (input.cashData && input.cashData.extraCash < 0) {
    extrasCash = input.cashData.extraCash * -1
  }

  let salesTotal = input.salesCategoryData
    ? Object.values(input.salesCategoryData).reduce(
        (acc: number, category: TotalSales) => acc + category.total,
        0
      )
    : 0

  return salesTotal + (input.taxes || 0) + (input.tips?.total || 0) + extrasCash
}
