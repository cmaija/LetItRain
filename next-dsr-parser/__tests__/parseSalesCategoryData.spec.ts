import { beforeAll, describe, expect, test } from 'vitest'
import { parseSalesByCategory } from '@/lib/parseSalesCategoryData'
import { parsedCsv } from './mocks/parsedCsv'
import { TotalsByCategory } from '@/lib/interfaces'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'

describe('useSalesCategoryData', () => {
  describe('when given a normal looking csv', () => {
    let salesByCategoryData: TotalsByCategory | undefined
    beforeAll(() => {
      let sales = parseSalesByCategory(parsedCsv)
      salesByCategoryData = sales?.sales
    })

    test('should correctly parse dumpling data', () => {
      expect(salesByCategoryData).toBeDefined()
      if (salesByCategoryData) {
        expect(salesByCategoryData['TIPPLES Dumplings']).toBeDefined()
        expect(salesByCategoryData['TIPPLES Dumplings'].total).toEqual(1389)
        expect(salesByCategoryData['TIPPLES Dumplings'].comps).toEqual(206)
        expect(salesByCategoryData['TIPPLES Dumplings'].netSales).toEqual(1183)
      }
    })

    test('should correctly parse meat data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['Meat']).toBeDefined()
        expect(salesByCategoryData['Meat'].netSales).toEqual(586)
        expect(salesByCategoryData['Meat'].comps).toEqual(172)
        expect(salesByCategoryData['Meat'].total).toEqual(758)
      }
    })

    test('should correctly parse seafood data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['Seafood']).toBeDefined()
        expect(salesByCategoryData['Seafood'].netSales).toEqual(112)
        expect(salesByCategoryData['Seafood'].comps).toEqual(0)
        expect(salesByCategoryData['Seafood'].total).toEqual(112)
      }
    })

    test('should correctly parse dessert data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['Desserts']).toBeDefined()
        expect(salesByCategoryData['Desserts'].netSales).toEqual(170)
        expect(salesByCategoryData['Desserts'].comps).toEqual(0)
        expect(salesByCategoryData['Desserts'].total).toEqual(170)
      }
    })

    test('should correctly parse liquor data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['LIQUOR']).toBeDefined()
        expect(salesByCategoryData['LIQUOR'].netSales).toEqual(3470)
        expect(salesByCategoryData['LIQUOR'].comps).toEqual(92)
        expect(salesByCategoryData['LIQUOR'].total).toEqual(3562)
      }
    })

    test('should correctly parse beer data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['BEER']).toBeDefined()
        expect(salesByCategoryData['BEER'].netSales).toEqual(271)
        expect(salesByCategoryData['BEER'].comps).toEqual(8)
        expect(salesByCategoryData['BEER'].total).toEqual(279)
      }
    })

    test('should correctly parse wine data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['WINE']).toBeDefined()
        expect(salesByCategoryData['WINE'].netSales).toEqual(686)
        expect(salesByCategoryData['WINE'].comps).toEqual(0)
        expect(salesByCategoryData['WINE'].total).toEqual(686)
      }
    })

    test('should correctly parse beverages data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['BEVERAGES']).toBeDefined()
        expect(salesByCategoryData['BEVERAGES'].netSales).toEqual(276)
        expect(salesByCategoryData['BEVERAGES'].comps).toEqual(8)
        expect(salesByCategoryData['BEVERAGES'].total).toEqual(284)
      }
    })

    test('should correctly parse retail data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['RETAIL']).toBeDefined()
        expect(salesByCategoryData['RETAIL'].netSales).toEqual(0)
        expect(salesByCategoryData['RETAIL'].comps).toEqual(0)
        expect(salesByCategoryData['RETAIL'].total).toEqual(0)
      }
    })

    test('should correctly parse tickets data', () => {
      if (salesByCategoryData) {
        expect(salesByCategoryData['TICKETS']).toBeDefined()
        expect(salesByCategoryData['TICKETS'].netSales).toBeCloseTo(4213.03, 4)
        expect(salesByCategoryData['TICKETS'].comps).toBeCloseTo(0, 4)
        expect(salesByCategoryData['TICKETS'].total).toBeCloseTo(4213.03, 4)
      }
    })
  })

  describe('when given a valid sheet with non common values', () => {
    let weirdSalesData: TotalsByCategory | undefined
    beforeAll(() => {
      let sales = parseSalesByCategory(parsedCsvWithRetailWeirdness)
      weirdSalesData = sales?.sales
    })
    test('should correctly parse dumpling data', () => {
      expect(weirdSalesData).toBeDefined()
      if (weirdSalesData) {
        expect(weirdSalesData['TIPPLES Dumplings']).toBeDefined()
        expect(weirdSalesData['TIPPLES Dumplings'].total).toEqual(815)
        expect(weirdSalesData['TIPPLES Dumplings'].comps).toEqual(0)
        expect(weirdSalesData['TIPPLES Dumplings'].netSales).toEqual(815)
      }
    })

    test('should correctly parse meat data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['Meat']).not.toBeDefined()
      }
    })

    test('should correctly parse seafood data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['Seafood']).not.toBeDefined()
      }
    })

    test('should correctly parse dessert data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['Desserts']).not.toBeDefined()
      }
    })

    test('should correctly parse liquor data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['LIQUOR']).toBeDefined()
        expect(weirdSalesData['LIQUOR'].netSales).toEqual(1059)
        expect(weirdSalesData['LIQUOR'].comps).toEqual(0)
        expect(weirdSalesData['LIQUOR'].total).toEqual(1059)
      }
    })

    test('should correctly parse beer data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['BEER']).toBeDefined()
        expect(weirdSalesData['BEER'].netSales).toEqual(64)
        expect(weirdSalesData['BEER'].comps).toEqual(0)
        expect(weirdSalesData['BEER'].total).toEqual(64)
      }
    })

    test('should correctly parse wine data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['WINE']).not.toBeDefined()
      }
    })

    test('should correctly parse beverages data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['BEVERAGES']).toBeDefined()
        expect(weirdSalesData['BEVERAGES'].netSales).toEqual(126)
        expect(weirdSalesData['BEVERAGES'].comps).toEqual(0)
        expect(weirdSalesData['BEVERAGES'].total).toEqual(126)
      }
    })

    test('should correctly parse retail data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['RETAIL']).toBeDefined()
        expect(weirdSalesData['RETAIL'].netSales).toEqual(20)
        expect(weirdSalesData['RETAIL'].comps).toEqual(0)
        expect(weirdSalesData['RETAIL'].total).toEqual(20)
      }
    })

    test('should correctly parse tickets data', () => {
      if (weirdSalesData) {
        expect(weirdSalesData['TICKETS']).toBeDefined()
        expect(weirdSalesData['TICKETS'].netSales).toBeCloseTo(700, 4)
        expect(weirdSalesData['TICKETS'].comps).toBeCloseTo(0)
        expect(weirdSalesData['TICKETS'].total).toBeCloseTo(700, 4)
      }
    })
  })
})
