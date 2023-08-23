import { beforeAll, describe, expect, test } from 'vitest'
import { parseTaxData } from '../util/parseTaxData'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { calculateCredits } from '../util/calculateCredits'
import { parseCash } from '../util/parseCash'
import { parseSalesByCategory } from '../util/parseSalesCategoryData'
import { parseTips } from '../util/parseTips'

describe('calculateCredits', () => {
  describe('when given a typical csv', () => {
    let credits: number
    beforeAll(() => {
      let sales = parseSalesByCategory(parsedCsv)
      let tips = parseTips(parsedCsv)
      let taxes = parseTaxData(parsedCsv)
      let cash = parseCash(parsedCsv)

      credits = calculateCredits({
        salesCategoryData: sales?.sales || {},
        taxes: taxes?.taxes || 0,
        tips: tips,
        cashData: cash,
      })
    })

    test('it should properly determine the credit amount', () => {
      expect(credits).toBeDefined()
      expect(credits).toBeCloseTo(13734.56, 4)
    })
  })

  describe('when given a weird csv', () => {
    let credits: number
    beforeAll(() => {
      let sales = parseSalesByCategory(parsedCsvWithRetailWeirdness)
      let tips = parseTips(parsedCsvWithRetailWeirdness)
      let taxes = parseTaxData(parsedCsvWithRetailWeirdness)
      let cash = parseCash(parsedCsvWithRetailWeirdness)

      credits = calculateCredits({
        salesCategoryData: sales?.sales || {},
        taxes: taxes?.taxes || 0,
        tips: tips,
        cashData: cash,
      })
    })

    test('it should properly determine the credit amount', () => {
      expect(credits).toBeDefined()
      expect(credits).toBeCloseTo(3763.95, 4)
    })
  })
})
