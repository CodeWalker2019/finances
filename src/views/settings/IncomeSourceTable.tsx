import monobankApi from "../../api/monobank";
import jsonServerApi from "../../api/jsonServer";
import { getCalculatedIncomeSource, getUniqueName } from "../../helpers";
import { ENTITY_TYPES, INCOMES_SOUCE_INITIAL_NAME } from "../../constants";
import EditableTableRecords from "../../components/EditableTableRecords";
import { IncomeSource } from "../../types";

const COLUMNS = [
  {
    label: 'Income Source',
    accessor: 'source',
    editable: true,
  },
  {
    label: 'USD $',
    accessor: 'value',
    adorment: '$',
    editable: true,
  },
  {
    label: 'UAH ₴',
    accessor: 'uah',
    adorment: '₴',
    editable: false,
  },
  {
    label: 'UAH ₴ Gross',
    accessor: 'gross',
    adorment: '₴',
    editable: false,
  },
]

export default function IncomeSourceTable() {
  const { isLoading, data: usdData } = monobankApi.useGetUsdCurrencyQuery()
  const { data: incomeSources = [] } = jsonServerApi.useGetIncomeSourcesQuery()
  
  function dataParser(data: IncomeSource[]) {
    return getCalculatedIncomeSource(data, usdData)
  }

  function getInitialItem() {
    const names = incomeSources.map(s => s.source)
    return {
      source: getUniqueName(names, INCOMES_SOUCE_INITIAL_NAME),
      value: 0
    }
  }

  return (
    <EditableTableRecords
      addButtonLabel="+ Add income source"
      type={ENTITY_TYPES.IncomeSource}
      getInitialItem={getInitialItem}
      dataParser={dataParser}
      isLoading={isLoading}
      columns={COLUMNS}
    />
  )
}