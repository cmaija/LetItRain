import { beforeAll, describe, expect, test } from 'vitest'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { Tips, parseTips } from '../util/parseTips'

describe('parseTips', () => {
  describe('when given a typical csv', () => {
    let tipsData: Tips | undefined
    beforeAll(() => {
      tipsData = parseTips(parsedCsv)
    })

    test('it should properly parse tips data ', () => {
      expect(tipsData).toBeDefined()
      if (tipsData) {
        expect(tipsData['Charge Tips']).toEqual(309.9)
        expect(tipsData.AutoGratuity).toEqual(1389.0)
        expect(tipsData.total).toEqual(1698.9)
      }
    })
  })

  describe('when given a weird csv', () => {
    let tipsData: Tips | undefined
    beforeAll(() => {
      tipsData = parseTips(parsedCsvWithRetailWeirdness)
    })

    test('it should properly parse tips data ', () => {
      expect(tipsData).toBeDefined()
      if (tipsData) {
        expect(tipsData['Charge Tips']).toEqual(0)
        expect(tipsData.AutoGratuity).toEqual(800.2)
        expect(tipsData.total).toEqual(800.2)
      }
    })
  })
})
