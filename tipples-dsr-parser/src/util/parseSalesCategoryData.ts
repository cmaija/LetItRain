import { TotalsByCategory } from './interfaces'
import { findRowIdx, parseCol } from './shared'

const SF_SALES_TAX = 0.08625
/*
 *  @function fixCategoryTotals
 *  @description Fixes the aggrgated categories for when the tickets and retail columns are not correct.
 *               Sometimes, the retail column represents retail sales as long as ticket sales.
 *               This function removes the ticket sales from the retail colum, and calculates the actual retail sales
 *               by from the tax amount on the column.
 *  @param {TotalsByCategory} aggregatedCategories - The aggregated categories to fix
 *  @param {string[]} inputRange - The range of the input data that will contain the incorrect retail and tickets rows
 *  @param {number} taxColumn - The column number of the tax column
 *  @param {number} netSalesColumn - The column number of the netSls column
 *  @returns {TotalsByCategory} - The corrected aggregated categories with the correct retail and tickets amounts
 */
export function fixCategoryTotals(
  aggregatedCategories: TotalsByCategory
): TotalsByCategory {
  let correctedCategories = { ...aggregatedCategories }

  let retailKey = Object.keys(correctedCategories).find(
    (key) => key.toLowerCase() === 'retail'
  )
  let ticketsKey = Object.keys(correctedCategories).find(
    (key) => key.toLowerCase() === 'tickets'
  )

  if (!retailKey) {
    return correctedCategories
  }

  if (!ticketsKey) {
    ticketsKey = 'TICKETS'
    correctedCategories['TICKETS'] = {
      netSales: 0,
      comps: 0,
      taxes: 0,
      total: 0,
    }
  }
  let retail = correctedCategories[retailKey]

  if (!retail) {
    return correctedCategories
  }

  let retailTaxes = retail.taxes
  let retailSales = retail.netSales
  let retailSalesActual = 0
  let ticketSalesFromRetailSalesCategory = retailSales
  if (retailTaxes > 0) {
    // sometimes the system rounds a penny so that the exact sales amount is not a multiple of 20 (the only retail item is $20)
    // this means we just need to determine if th
    let approxRetailSales = retailTaxes / SF_SALES_TAX
    let itemsSold = Math.floor(approxRetailSales / 20)
    retailSalesActual = itemsSold * 20
    ticketSalesFromRetailSalesCategory = retailSales - retailSalesActual
  }

  correctedCategories[retailKey].netSales = retailSalesActual
  correctedCategories[retailKey].total = retailSalesActual

  let ticketSalesBeforeCorrection = correctedCategories[ticketsKey].netSales
  correctedCategories[ticketsKey].netSales =
    ticketSalesBeforeCorrection + ticketSalesFromRetailSalesCategory

  correctedCategories[ticketsKey].total =
    ticketSalesBeforeCorrection + ticketSalesFromRetailSalesCategory

  return correctedCategories
}

function aggregateCategories(
  csv: any,
  salesCol: number,
  taxesCol: number,
  compsCol: number,
  startIdx: number,
  endIdx: number
): TotalsByCategory {
  let categories = csv.slice(startIdx, endIdx)
  let totalSales: TotalsByCategory = {}
  categories.forEach((category: string[]) => {
    let categoryNameIdx = category.findIndex((value) => value !== '\n" "')
    // regex that tests to see if a string is only spaces
    let onlySpacesRegex = /^\s*$/
    if (!onlySpacesRegex.test(category[categoryNameIdx])) {
      let categoryStats = {
        netSales: parseFloat(category[salesCol]),
        comps: parseFloat(category[compsCol]),
        taxes: parseFloat(category[taxesCol]),
        total: parseFloat(category[salesCol]) + parseFloat(category[compsCol]),
      }
      totalSales[category[categoryNameIdx]] = categoryStats
    }
  })

  return totalSales
}
export function parseSalesByCategory(
  csv: any
): { sales: TotalsByCategory; salesSectionEnd: number } | undefined {
  if (!csv || !csv.length)
    return {
      sales: {},
      salesSectionEnd: -1,
    }
  let headersIdx: number | undefined = findRowIdx(csv, (value: string[]) =>
    value.includes('Sales Categories')
  )

  if (!headersIdx) {
    throw new Error(
      'Could not find Sales By Category headers row in the provided CSV'
    )
  }
  const headers: string[] = csv[headersIdx]
  let salesCol: number = parseCol(headers, 'Net Sls')
  let taxesCol: number = parseCol(headers, 'Taxes')
  let compsCol: number = parseCol(headers, 'Comps')

  // Get the range of the rows that contain sales by category information (Meat, Dumplings, Tickets etc)
  const startIdx = headersIdx + 1
  const endIdx = findRowIdx(
    csv,
    (row) => row.some((value) => /^-+$/g.test(value)),
    headersIdx
  )

  let totalSalesAndCompsByCategory: TotalsByCategory = aggregateCategories(
    csv,
    salesCol,
    taxesCol,
    compsCol,
    startIdx,
    endIdx
  )

  totalSalesAndCompsByCategory = fixCategoryTotals(totalSalesAndCompsByCategory)

  let totalNetSales: number = 0
  let totalComps: number = 0
  Object.values(totalSalesAndCompsByCategory).forEach((category) => {
    totalNetSales += category.netSales
    totalComps += category.comps
  })

  return { sales: totalSalesAndCompsByCategory, salesSectionEnd: endIdx }
}
