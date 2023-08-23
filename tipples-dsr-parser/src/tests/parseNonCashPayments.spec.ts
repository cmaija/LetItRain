import { beforeAll, describe, expect, test } from 'vitest'
import { parseTaxData } from '../util/parseTaxData'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { Comps, parseComps } from '../util/parseComps'
import {
  NonCashPayments,
  parseNonCashPayments,
} from '../util/parseNonCashPayments'

describe('parseNonCashPayments', () => {
  describe('when given a typical csv', () => {
    let paymentsData: NonCashPayments | undefined
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsv)
      let comps = parseComps(parsedCsv, taxes?.taxesSectionEnd || 0)
      let payments = parseNonCashPayments(
        parsedCsv,
        comps?.compsSectionEnd || 0
      )
      paymentsData = payments?.nonCashPayments
    })

    test('it should properly parse comps data ', () => {
      expect(paymentsData).toBeDefined()
      if (paymentsData) {
        expect(paymentsData['AMEX']).toEqual(1803.98)
        expect(paymentsData['VISA']).toEqual(6130.49)
        expect(paymentsData['MC']).toEqual(1065.98)
        expect(paymentsData['DISCOVER']).toEqual(60.02)
        expect(paymentsData['OT']).toEqual(3694.03)
        expect(paymentsData['Checking']).toEqual(9060.47)
        expect(paymentsData['PPD Revenue']).toEqual(3694.03)
      }
    })
  })

  describe('when given a weird csv', () => {
    let paymentsData: NonCashPayments | undefined
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
      paymentsData = payments?.nonCashPayments
    })

    test('it should correctly parse the comps data', () => {
      expect(paymentsData).toBeDefined()
      if (paymentsData) {
        expect(Object.keys(paymentsData).length).toBe(3)
        expect(paymentsData['OT']).toEqual(3763.95)
        expect(paymentsData['Checking']).toEqual(0)
        expect(paymentsData['PPD Revenue']).toEqual(3763.95)
      }
    })
  })
})
