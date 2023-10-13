import { beforeAll, describe, expect, test } from 'vitest'
import { parseTaxData } from '@/lib/parseTaxData'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'

describe('parseTaxData', () => {
  describe('when given a typical csv', () => {
    let taxData: number
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsv)
      taxData = taxes?.taxes || -1
    })

    test('it should correctly parse the tax data', () => {
      expect(taxData).toEqual(582.63)
    })
  })

  describe('when given a weird csv', () => {
    let taxData: number
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsvWithRetailWeirdness)
      taxData = taxes?.taxes || -1
    })

    test('it should correctly parse the tax data', () => {
      expect(taxData).toEqual(179.75)
    })
  })
})
