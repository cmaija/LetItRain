import { beforeAll, describe, expect, test } from 'vitest'
import { parseTaxData } from '@/lib/parseTaxData'
import { parsedCsv } from './mocks/parsedCsv'
import { parsedCsvWithRetailWeirdness } from './mocks/parsedCsvWithRetailWeirdness'
import { parseComps } from '@/lib/parseComps'
import { Comps } from '@/lib/interfaces'

describe('parseComps', () => {
  describe('when given a typical csv', () => {
    let compsData: Comps | undefined
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsv)
      let comps = parseComps(parsedCsv, taxes?.taxesSectionEnd || 0)
      compsData = comps?.comps
    })

    test('it should properly parse comps data ', () => {
      expect(compsData).toBeDefined()
      if (compsData) {
        expect(compsData['Mgr\\nMeal']).toEqual(239.0)
        expect(compsData['$ Off']).toEqual(26.0)
        expect(compsData['Did Not Like']).toEqual(8.0)
        expect(compsData['Band Comp']).toEqual(187.0)
        expect(compsData['Food Error']).toEqual(26.0)
      }
    })
  })

  describe('when given a weird csv', () => {
    let compsData: Comps | undefined
    beforeAll(() => {
      let taxes = parseTaxData(parsedCsvWithRetailWeirdness)
      let comps = parseComps(
        parsedCsvWithRetailWeirdness,
        taxes?.taxesSectionEnd || 0
      )
      compsData = comps?.comps
    })

    test('it should correctly parse the comps data', () => {
      expect(compsData).toBeDefined()
      if (compsData) {
        expect(Object.keys(compsData).length).toBe(0)
      }
    })
  })
})
