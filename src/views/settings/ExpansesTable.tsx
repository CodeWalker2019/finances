import monobankApi from "../../api/monobank";
import jsonServerApi from "../../api/jsonServer";
import { calculateRemaingMoney, calculateTotalIncome, getUniqueName } from "../../helpers";
import { ENTITY_TYPES, EXPANSES_INITIAL_NAME } from "../../constants";
import EditableTableRecords from "../../components/EditableTableRecords";
import { useMemo } from "react";

const COLUMNS = [
  {
    label: 'Source',
    accessor: 'source',
    editable: true,
  },
  {
    label: 'UAH ₴',
    accessor: 'value',
    adorment: '₴',
    editable: true,
  },
]

export default function IncomeSourceTable() {
  const { isLoading, data: usd } = monobankApi.useGetUsdCurrencyQuery()
  const { data: expanses = [] } = jsonServerApi.useGetExpansesQuery()
  const { data: incomeSources = [] } = jsonServerApi.useGetIncomeSourcesQuery()
  
  const remainingBudget = useMemo(() => {
    if (usd) {
      const totalIncome = calculateTotalIncome(incomeSources, usd)
      return calculateRemaingMoney(expanses, totalIncome, usd)
    }
    return 0
  }, [usd, expanses, incomeSources])

  function getInitialItem() {
    const names = expanses.map(s => s.source)
    return {
      source: getUniqueName(names, EXPANSES_INITIAL_NAME),
      value: 0
    }
  }

  const renderRemainingBudget = (
    <div style={{ display: 'flex', columnGap: 20, alignItems: 'center' }}>
      <h3>Remains:</h3>
      <p>{remainingBudget} ₴</p>
    </div>
  )

  return (
    <>
      <EditableTableRecords
        getInitialItem={getInitialItem}
        addButtonLabel="+ Add expanse"
        type={ENTITY_TYPES.Expanse}
        isLoading={isLoading}
        columns={COLUMNS}
      />
      {!isLoading && renderRemainingBudget}
    </>
  )
}