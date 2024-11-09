export interface IncomeSource {
  source: string
  value: number
  id: string
}

export interface Currency {
  currencyCodeA: number
  currencyCodeB: number
  date: number
  rateBuy: number
  rateSell: number
}
