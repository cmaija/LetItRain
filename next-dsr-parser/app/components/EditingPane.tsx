'use client'
import {
  CashData,
  Comps,
  NonCashPayments,
  Tips,
  TotalsByCategory,
} from '@/lib/interfaces'
import NonCashPaymentsTable from './NonCashPaymentsTable'
import SalesTable from './SalesTable'
import CompsTable from './CompsTable'
import TipsTable from './TipsTable'
import CashPaymentsTable from './CashPaymentsTable'
import { useEffect, useState } from 'react'
import { parseSalesByCategory } from '@/lib/parseSalesCategoryData'
import { parseTaxData } from '@/lib/parseTaxData'
import { parseComps } from '@/lib/parseComps'
import { parseNonCashPayments } from '@/lib/parseNonCashPayments'
import { parseTips } from '@/lib/parseTips'
import { parseCash } from '@/lib/parseCash'
import { calculateCredits } from '@/lib/calculateCredits'
import { calculateDebits } from '@/lib/calculateDebits'
import { convertToMoneyString } from '@/lib/shared'

interface Props {
  report: string[][]
  date: Date
}

export default function EditingPane({ report }: Props) {
  function parseCsv() {
    let salesInfo = parseSalesByCategory(report)
    setSalesByCategory(salesInfo?.sales)
    let taxesInfo = parseTaxData(report)
    setTotalTaxes(taxesInfo?.taxes)
    let compsInfo = parseComps(report, taxesInfo?.taxesSectionEnd || 0)
    setComps(compsInfo.comps)
    let nonCashPaymentsInfo = parseNonCashPayments(
      report,
      compsInfo.compsSectionEnd
    )
    setNonCashPayments(nonCashPaymentsInfo.nonCashPayments)
    let tipsInfo = parseTips(report)
    setTips(tipsInfo)
    let cashInfo = parseCash(report)
    setCashPayments(cashInfo)
  }
  const [salesByCategory, setSalesByCategory] = useState<TotalsByCategory>()
  const [totalTaxes, setTotalTaxes] = useState<number>()
  const [comps, setComps] = useState<Comps>()
  const [nonCashPayments, setNonCashPayments] = useState<NonCashPayments>()
  const [tips, setTips] = useState<Tips>()
  const [cashPayments, setCashPayments] = useState<CashData>()
  const [credits, setCredits] = useState<number>()
  const [debits, setDebits] = useState<number>()
  useEffect(() => {
    if (report && report.length > 0) {
      parseCsv()
    }
  }, [report])

  useEffect(() => {
    if (
      !!report &&
      salesByCategory &&
      totalTaxes &&
      comps &&
      nonCashPayments &&
      tips &&
      cashPayments
    ) {
      let totalCredits = calculateCredits({
        salesCategoryData: salesByCategory,
        taxes: totalTaxes,
        tips: tips,
        cashData: cashPayments,
      })

      setCredits(totalCredits)
      let totalDebits = calculateDebits({
        nonCashPayments,
        comps,
        cashData: cashPayments,
      })
      setDebits(totalDebits)
    }
  }, [
    report,
    salesByCategory,
    totalTaxes,
    comps,
    nonCashPayments,
    tips,
    cashPayments,
  ])
  return (
    <div className="relative flex flex-col w-full min-h-full gap-4 pr-4">
      <div className="flex w-full flex-row justify-between items-start flex-wrap">
        <div className="flex flex-col items-end gap-4">
          {nonCashPayments !== undefined && (
            <NonCashPaymentsTable
              nonCashPayments={nonCashPayments}
              onChangeNonCashPayments={setNonCashPayments}
            />
          )}
          {comps && <CompsTable comps={comps} onChangeComps={setComps} />}
          {cashPayments && (
            <CashPaymentsTable
              cashPayments={cashPayments}
              onChangeCashPayments={setCashPayments}
            />
          )}
        </div>

        <div className="flex flex-col items-end gap-4">
          {salesByCategory && totalTaxes !== undefined && (
            <SalesTable
              sales={salesByCategory}
              taxes={totalTaxes}
              onChangeSales={setSalesByCategory}
              onChangeTaxes={setTotalTaxes}
            />
          )}
          {tips && <TipsTable tips={tips} onChangeTips={setTips} />}
        </div>
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-row gap-4">
          <strong>Totals</strong>
          <strong>{convertToMoneyString(debits || 0)}</strong>
        </div>
        <div>
          <strong>{convertToMoneyString(credits || 0)}</strong>
        </div>
      </div>
    </div>
  )
}
