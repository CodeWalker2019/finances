import jsonServerApi from "../../api/jsonServer";
import EditableTableRecords from "../../components/EditableTableRecords";
import { ENTITY_TYPES, EXPANSES_INITIAL_NAME } from "../../constants";
import { getUniqueName } from "../../helpers";

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


export default function UnplannedExpanses() {
  const { data: unplannedExpanses = [] } = jsonServerApi.useGetUnplannedExpansesQuery()

  function getInitialItem() {
    const names = unplannedExpanses.map(s => s.source)
    return {
      source: getUniqueName(names, EXPANSES_INITIAL_NAME),
      value: 0
    }
  }

  return (
    <EditableTableRecords
      getInitialItem={getInitialItem}
      addButtonLabel="+ Add unplanned expanse"
      type={ENTITY_TYPES.UnplannedExpanse}
      isLoading={false}
      columns={COLUMNS}
    />
  )
}