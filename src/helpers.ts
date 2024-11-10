import { INCOMES_SOUCE_INITIAL_NAME } from "./constants"
import { Currency, IncomeSource } from "./types"

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

export function getCalculateIncomeSource(sources: IncomeSource[], usd?: Currency) {
  if (!usd) return sources
  return sources.map((s) => {
    const uah = twoValuesAfterCommaRound(usd.rateSell * s.value)
    const gross = twoValuesAfterCommaRound(getGross(uah))
    return { ...s, uah, gross }
  })
}
