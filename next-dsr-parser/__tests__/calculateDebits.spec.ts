import { beforeAll, describe, expect, test } from 'vitest'
import { parseTaxData } from '@/lib/parseTaxData'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { parseComps } from '@/lib/parseComps'
import { parseNonCashPayments } from '@/lib/parseNonCashPayments'
import { calculateDebits } from '@/lib/calculateDebits'
import { parseCash } from '@/lib/parseCash'
import { parsedCsvWithNegativeExtrasCash } from './mocks/parsedCsvWithNegativeExtrasCash'

describe('calculateDebits', () => {
  describe('when given a typical csv', () => {
    let debits: number
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsv)
      let comps = parseComps(parsedCsv, taxes?.taxesSectionEnd || 0)
      let payments = parseNonCashPayments(
        parsedCsv,
        comps?.compsSectionEnd || 0
      )
      let cash = parseCash(parsedCsv)

      debits = calculateDebits({
        nonCashPayments: payments.nonCashPayments,
        comps: comps.comps,
        cashData: cash,
      })
    })

    test('it should properly determine the debit amount', () => {
      expect(debits).toBeDefined()
      expect(debits).toBeCloseTo(13734.56, 4)
    })
  })

  describe('when given a weird csv', () => {
    let debits: number
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsvWithRetailWeirdness)
      let comps = parseComps(
        parsedCsvWithRetailWeirdness,
        taxes?.taxesSectionEnd || 0
      )
      let payments = parseNonCashPayments(
        parsedCsvWithRetailWeirdness,
        comps?.compsSectionEnd || 0
      )
      let cash = parseCash(parsedCsvWithRetailWeirdness)

      debits = calculateDebits({
        nonCashPayments: payments.nonCashPayments,
        comps: comps.comps,
        cashData: cash,
      })
    })

    test('it should properly determine the debit amount', () => {
      expect(debits).toBeDefined()
      expect(debits).toBeCloseTo(3763.95, 4)
    })
  })

  describe('when given a csv with negative estras cash', () => {
    let debits: number
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsvWithNegativeExtrasCash)
      let comps = parseComps(
        parsedCsvWithNegativeExtrasCash,
        taxes?.taxesSectionEnd || 0
      )
      let payments = parseNonCashPayments(
        parsedCsvWithNegativeExtrasCash,
        comps?.compsSectionEnd || 0
      )
      let cash = parseCash(parsedCsvWithNegativeExtrasCash)

      debits = calculateDebits({
        nonCashPayments: payments.nonCashPayments,
        comps: comps.comps,
        cashData: cash,
      })
    })

    test('it should properly determine the debit amount', () => {
      expect(debits).toBeDefined()
      expect(debits).toBeCloseTo(12239.0, 4)
    })
  })
})
