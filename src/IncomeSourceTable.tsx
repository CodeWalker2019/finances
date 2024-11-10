import monobankApi from "./api/monobank";
import jsonServerApi from "./api/jsonServer";
import { getCalculateIncomeSource, getGross, getUniqueName, twoValuesAfterCommaRound } from "./helpers";
import { INCOMES_SOUCE_INITIAL_NAME } from "./constants";
import EditableTableRecords from "./components/EditableTableRecords";
import { IncomeSource } from "./types";
import { useMemo } from "react";

const COLUMNS = [
  {
    label: 'Income Source',
    accessor: 'source',
  },
  {
    label: 'USD$',
    accessor: 'value',
    adorment: '$',
  },
  {
    label: 'UAH',
    accessor: 'uah',
  },
  {
    label: 'UAH Gross',
    accessor: 'gross',
  },
]

export default function IncomeSourceTable() {
  const { isLoading, data: usdData } = monobankApi.useGetUsdCurrencyQuery()
  const { data: incomeSources = [] } = jsonServerApi.useGetIncomeSourcesQuery()
  const [updateIncomeSource] = jsonServerApi.useUpdateIncomeSourceMutation()
  const [removeIncomeSource] = jsonServerApi.useRemoveIncomeSourceMutation()
  const [addIncomeSource] = jsonServerApi.useAddIncomeSourceMutation()

  const parsedIncomeSources = useMemo(
    () => getCalculateIncomeSource(incomeSources, usdData),
    [incomeSources, usdData],
  )

  function handleAddIncomeSource() {
    const names = incomeSources.map(s => s.source)
    addIncomeSource({
      source: getUniqueName(names, INCOMES_SOUCE_INITIAL_NAME),
      value: 0
    })
  }

  function handleEditIncomeSource(incomeSource: IncomeSource) {
    updateIncomeSource(incomeSource)
  }

  function handleRemoveIncomeSource(incomeSource: IncomeSource) {
    removeIncomeSource(incomeSource.id)
  }

  return (
    <EditableTableRecords<IncomeSource>
      handleRemoveItem={handleRemoveIncomeSource}
      handleEditItem={handleEditIncomeSource}
      handleAddItem={handleAddIncomeSource}
      data={parsedIncomeSources}
      isLoading={isLoading}
      columns={COLUMNS}
    />
  )
}