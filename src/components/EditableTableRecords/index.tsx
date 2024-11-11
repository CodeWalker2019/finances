import { useMemo } from "react";
import jsonServerApi from "../../api/jsonServer";
import EditableTableRecordsComponent, { Column } from "./EditableTableRecordsComponent";
import { IncomeSource } from "../../types";
import { ENTITY_TYPES } from "../../constants";

interface TableProps {
  dataParser?: (items: any) => any
  getInitialItem: () => any
  isLoading: boolean
  columns: Column[]
  type: ENTITY_TYPES
  addButtonLabel: string
}

export default function EditableTableRecords({ addButtonLabel, columns, dataParser = (data) => data, type, getInitialItem, isLoading }: TableProps) {
  const { data = [] } = jsonServerApi[`useGet${type}sQuery`]()
  const [update] = jsonServerApi[`useUpdate${type}Mutation`]()
  const [remove] = jsonServerApi[`useRemove${type}Mutation`]()
  const [add] = jsonServerApi[`useAdd${type}Mutation`]()

  type entityType = typeof data[number]

  const parsedData = dataParser(data)

  function handleAdd() {
    add(getInitialItem())
  }

  function handleEdit(item: entityType) {
    update(item)
  }

  function handleRemove(item: entityType) {
    remove(item.id)
  }

  return (
    <EditableTableRecordsComponent<entityType>
      handleRemoveItem={handleRemove}
      handleEditItem={handleEdit}
      handleAddItem={handleAdd}
      data={parsedData}
      isLoading={isLoading}
      columns={columns}
      addButtonLabel={addButtonLabel}
    />
  )
}
