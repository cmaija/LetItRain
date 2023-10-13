import { beforeAll, describe, expect, test } from 'vitest'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { parseCash } from '@/lib/parseCash'
import { CashData } from '@/lib/interfaces'

describe('parseCash', () => {
  describe('when given a typical csv', () => {
    let cashData: CashData | undefined
    beforeAll(() => {
      cashData = parseCash(parsedCsv)
    })

    test('it should properly parse cash data ', () => {
      expect(cashData).toBeDefined()
      if (cashData) {
        expect(cashData.cashTaken).toBeCloseTo(494.06, 4)
        expect(cashData.pettyCash).toBeCloseTo(492, 4)
        expect(cashData.extraCash).toBeCloseTo(2.06, 4)
      }
    })
  })

  describe('when given a weird csv', () => {
    let cashData: CashData | undefined
    beforeAll(() => {
      cashData = parseCash(parsedCsvWithRetailWeirdness)
    })

    test('it should properly parse cash data ', () => {
      expect(cashData).toBeDefined()
      if (cashData) {
        expect(cashData.cashTaken).toBeCloseTo(0, 4)
        expect(cashData.pettyCash).toBeCloseTo(0, 4)
        expect(cashData.extraCash).toBeCloseTo(0, 4)
      }
    })
  })
})
