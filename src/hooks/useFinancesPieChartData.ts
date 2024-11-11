import { useMemo } from "react";
import jsonServerApi from "../api/jsonServer";
import monobankApi from "../api/monobank";
import { calculateRemaingMoney, calculateTotalExpanses, calculateTotalIncome, percentage } from "../helpers";

export default function useFinancesPieChartData() {
  const { data: usd } = monobankApi.useGetUsdCurrencyQuery()
  const { data: incomeSources = [] } = jsonServerApi.useGetIncomeSourcesQuery()
  const { data: expanses = [] } = jsonServerApi.useGetExpansesQuery()
  const { data: unplannedExpanses = [] } = jsonServerApi.useGetUnplannedExpansesQuery()
  
  const chartData = useMemo(() => {
    if (!usd) return []

    const totalIncome = calculateTotalIncome(incomeSources, usd)
    const totalExpanses = calculateTotalExpanses(expanses)
    const totalUnplannedExpanses = calculateTotalExpanses(unplannedExpanses)
    const remaining = calculateRemaingMoney([...unplannedExpanses, ...expanses], totalIncome, usd)

    return [
      { label: `Expanses [${totalExpanses} UAH ₴]`, value: percentage(totalExpanses, totalIncome) || 0 },
      { label: `Unplanned Expanses [${totalUnplannedExpanses} UAH ₴]`, value: percentage(totalUnplannedExpanses, totalIncome) || 0 },
      { label: `Remaining Money [${remaining} UAH ₴]`, value: percentage(remaining, totalIncome) || 0 },
    ]
  }, [incomeSources, expanses, usd, unplannedExpanses])

  return chartData
}
