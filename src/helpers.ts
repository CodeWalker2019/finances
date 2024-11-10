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
  return value.trim().toLowerCase()
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

export function calculateRemaingMoney(expanses: Expanse[], incomeSources: IncomeSource[], usd: Currency) {
  const totalExpansesValue = sum(expanses.map(e => e.value))
  const income = incomeSources.map(s => getIncomeUahValue(s, usd).gross)
  const totalIncome = sum(income)
  return totalIncome - totalExpansesValue
}
