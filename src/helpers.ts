import { Currency, Expanse, IncomeSource } from "./types"
import { sum } from 'lodash'

const DEBT_PERCENTAGE = 5

export function twoValuesAfterCommaRound(value: number) {
  return Math.round(value * 100) / 100
}

export function getGross(valueUah: number) {
  const debtValue = twoValuesAfterCommaRound(valueUah * 5 / 100)
  return valueUah - debtValue
}

function formatName(value: string) {
  return value?.trim()?.toLowerCase()
}

export function getUniqueName(collection: string[], intialName: string) {
  let name = intialName
  let counter = 0

  collection.forEach((existingName) => {
    if (formatName(existingName) !== formatName(name)) return
    counter += 1
    name = `${intialName} (${counter})`
  })

  return name
}

export function getIncomeUahValue(source: IncomeSource, usd: Currency) {
  const uah = twoValuesAfterCommaRound(usd.rateSell * source.value)
  const gross = twoValuesAfterCommaRound(getGross(uah))
  return { uah, gross }
}

export function getCalculatedIncomeSource(sources: IncomeSource[], usd?: Currency) {
  if (usd) return sources.map((s) => ({ ...s, ...getIncomeUahValue(s, usd) }))
  return sources
}

export function calculateTotalIncome(incomeSources: IncomeSource[], usd: Currency) {
  const income = incomeSources.map(s => getIncomeUahValue(s, usd).gross)
  return sum(income)
}

export function calculateTotalExpanses(expanses: Expanse[]) {
  const income = expanses.map(s => s.value)
  return sum(income)
}

export function calculateRemaingMoney(expanses: Expanse[], totalIncome: number, usd: Currency) {
  const totalExpansesValue = sum(expanses.map(e => e.value))
  return Math.round((totalIncome - totalExpansesValue) * 100) / 100
}

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

export function percentage(part: number, whole: number) {
  return Math.round((part / whole) * 100)
}
