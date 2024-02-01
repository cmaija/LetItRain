import {
  TotalsByCategory,
  Comps,
  NonCashPayments,
  Tips,
  CashData,
} from './interfaces'
import { qboAccountCategories, qboAccounts } from './qboAccountNames'

export type Account = keyof typeof qboAccounts
export type JournalEntry = {
  [key in Account as string]?: number
}

export function matchDataToAccounts(reportData: {
  salesByCategory?: TotalsByCategory
  totalTaxes?: number
  comps?: Comps
  nonCashPayments?: NonCashPayments
  tips?: Tips
  cashPayments?: CashData
}): JournalEntry {
  let journalEntry: JournalEntry = {}
  Object.keys(qboAccounts).forEach((accountNumber) => {
    const acct = accountNumber as Account
    journalEntry[acct] = 0
  })

  matchNonCashPayments(journalEntry, reportData.nonCashPayments)
  matchSales(journalEntry, reportData.salesByCategory)
  matchTaxes(journalEntry, reportData.totalTaxes)
  matchComps(journalEntry, reportData.comps)
  matchTips(journalEntry, reportData?.tips?.total)
  matchCashPayments(journalEntry, reportData.cashPayments)
  return journalEntry
}

function matchNonCashPayments(
  journalEntry: JournalEntry,
  nonCashPayments?: NonCashPayments
) {
  if (!nonCashPayments) return
  for (let accountNumber of qboAccountCategories.nonCashPayments) {
    let potentialAccountNames =
      qboAccounts[accountNumber as Account]?.matchedCategoryNames
    for (let accountName of potentialAccountNames) {
      if (nonCashPayments[accountName]) {
        journalEntry[accountNumber as Account] = nonCashPayments[accountName]
      }
    }
  }
}

function matchSales(
  journalEntry: JournalEntry,
  salesByCategory?: TotalsByCategory
) {
  if (!salesByCategory) return
  for (let accountNumber of qboAccountCategories.salesByCategory) {
    let potentialAccountNames =
      qboAccounts[accountNumber as Account]?.matchedCategoryNames
    for (let accountName of potentialAccountNames) {
      if (salesByCategory[accountName]) {
        journalEntry[accountNumber as Account] =
          salesByCategory[accountName].total * -1
      }
    }
  }
}

function matchTaxes(journalEntry: JournalEntry, taxes?: number) {
  if (!taxes) return
  for (let accountNumber of qboAccountCategories.taxes) {
    journalEntry[accountNumber as Account] = taxes * -1
  }
}

function matchComps(journalEntry: JournalEntry, comps?: Comps) {
  if (!comps) return
  for (let accountNumber of qboAccountCategories.comps) {
    let potentialAccountNames =
      qboAccounts[accountNumber as Account]?.matchedCategoryNames
    for (let accountName of potentialAccountNames) {
      if (comps[accountName]) {
        let currentAmount = journalEntry[accountNumber as Account] || 0
        journalEntry[accountNumber as Account] =
          comps[accountName] + currentAmount
      }
    }
  }
}

function matchTips(journalEntry: JournalEntry, tips?: number) {
  if (!tips) return
  for (let accountNumber of qboAccountCategories.tips) {
    journalEntry[accountNumber as Account] = tips * -1
  }
}

function matchCashPayments(
  journalEntry: JournalEntry,
  cashPayments?: CashData
) {
  if (!cashPayments) return
  for (let accountNumber of qboAccountCategories.cashPayments) {
    let potentialAccountNames =
      qboAccounts[accountNumber as Account]?.matchedCategoryNames
    for (let accountName of potentialAccountNames) {
      if (cashPayments[accountName as keyof CashData]) {
        journalEntry[accountNumber as Account] =
          cashPayments[accountName as keyof CashData]
      }
    }
  }
}

export interface JournalRow {
  acct?: string
  value?: number
  order?: number
  name?: string
}

export function convertJournalToUsableArray(journal: JournalEntry) {
  return Object.keys(journal)
    .map((key) => ({
      acct: key,
      value: journal[key],
      order: qboAccounts[key as Account]?.order,
      name: qboAccounts[key as Account]?.name,
    }))
    .sort((a, b) => a.order - b.order)
}
