import { useEffect, useState } from 'react'
import './App.css'
import FileUploader from './components/FileUploader'
import { parseSalesByCategory } from './util/parseSalesCategoryData'
import { TotalsByCategory } from './util/interfaces'
import { parseTaxData } from './util/parseTaxData'
import { Comps, parseComps } from './util/parseComps'
import {
  NonCashPayments,
  parseNonCashPayments,
} from './util/parseNonCashPayments'
import { Tips } from './util/parseTips'
import { CashData } from './util/parseCash'

function App() {
  const [csv, setCsv] = useState<any[]>([])

  function handleCompletedUpload(file: string[]) {
    getExport(file)
  }

  async function getExport(file: string[]) {
    let filteredJunkOut = file.filter((row: any) => {
      if (Object.keys(row).length === 0) return false
      if (
        Object.keys(row).length === 1 &&
        Object.keys(row)[0].includes(
          '1 - Mr Tipples 39 Fell Street San Francisco, CA  94102 '
        )
      )
        return false
      return true
    })

    let mappedCsv = filteredJunkOut
      .map((item: any) => {
        delete item['1 - Mr Tipples 39 Fell Street San Francisco, CA  94102 ']
        return item
      })
      .filter(
        (item: any) =>
          !Object.values(item).every((item) => item === '' || item === ' ')
      )

    setCsv(mappedCsv.map((row: any) => Object.values(row)))
  }

  const [salesByCategory, setSalesByCategory] = useState<TotalsByCategory>()
  const [totalTaxes, setTotalTaxes] = useState<number>()
  const [comps, setComps] = useState<Comps>()
  const [nonCashPayments, setNonCashPayments] = useState<NonCashPayments>()
  const [tips, setTips] = useState<Tips>()
  const [cashPauments, setCashPayments] = useState<CashData>()

  useEffect(() => {
    if (csv && csv.length > 0) {
      let salesInfo = parseSalesByCategory(csv)
      setSalesByCategory(salesInfo?.sales)
      let taxesInfo = parseTaxData(csv)
      setTotalTaxes(taxesInfo?.taxes)
      let compsInfo = parseComps(csv, taxesInfo?.taxesSectionEnd || 0)
      setComps(compsInfo.comps)
      let nonCashPaymentsInfo = parseNonCashPayments(
        csv,
        compsInfo.compsSectionEnd
      )
      setNonCashPayments(nonCashPaymentsInfo.nonCashPayments)
    }
  }, [csv])

  return (
    <>
      {salesByCategory && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Cagtegory</th>
                <th>Net Sales</th>
                <th>Comps</th>
                <th>Taxes</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(salesByCategory).map((item) => (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{salesByCategory[item].netSales.toFixed(2)}</td>
                  <td>{salesByCategory[item].comps.toFixed(2)}</td>
                  <td>{salesByCategory[item].taxes.toFixed(2)}</td>
                  <td>{salesByCategory[item].total.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td>Totals</td>
                <td>
                  {Object.values(salesByCategory).reduce(
                    (acc, curr) => acc + curr.netSales,
                    0
                  )}
                </td>
                <td>
                  {Object.values(salesByCategory).reduce(
                    (acc, curr) => acc + curr.comps,
                    0
                  )}
                </td>
                <td>
                  {Object.values(salesByCategory).reduce(
                    (acc, curr) => acc + curr.taxes,
                    0
                  )}
                </td>
                <td>
                  {Object.values(salesByCategory).reduce(
                    (acc, curr) => acc + curr.total,
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td>Total Taxes</td>
                <td />
                <td />
                <td>{totalTaxes}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {nonCashPayments && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Payment Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(nonCashPayments).map((item) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>{nonCashPayments[item]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {comps && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Comp Account</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(comps).map((item) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>{comps[item]}</td>
                  </tr>
                ))}
                <tr>
                  <td>Total Comps</td>
                  <td>
                    {Object.values(comps).reduce((acc, curr) => acc + curr, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        <FileUploader onCompleteUpload={handleCompletedUpload} />
        {csv &&
          csv.map((item, index) => (
            <p style={{ whiteSpace: 'pre-wrap' }} key={index}>
              {`'index: ${index} ${JSON.stringify(item)}`}
            </p>
          ))}
      </div>
    </>
  )
}

export default App
