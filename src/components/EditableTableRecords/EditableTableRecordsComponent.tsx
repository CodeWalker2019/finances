import { Table, TableHead, TableRow, TableCell, Button, TableBody, TableFooter, Skeleton } from "@mui/material";
import TableDataRow from "./TableDataRow";
import ColumnHeader from "./HeaderColumn";

export type ItemId = { id: string }

export interface Column {
  adorment?: string
  accessor: string
  editable: boolean
  label: string
}

export interface GenericTableProps<T extends ItemId> {
  handleRemoveItem: (item: T) => void
  handleEditItem: (item: T) => void
  handleAddItem: () => void
  addButtonLabel: string
  columns: Column[]
  isLoading: boolean
  data: T[]
}

export default function EditableTableRecords<T extends ItemId>({
  handleRemoveItem,
  handleEditItem,
  handleAddItem,
  addButtonLabel,
  isLoading,
  columns,
  data,
}: GenericTableProps<T>) {
  if (isLoading) {
    return (
      <>
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
      </>
    )
  }

  const columnsRender = columns.map((c, index) => (
    <ColumnHeader key={c.label} column={c} index={index} />
  ))
  
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell width={3}></TableCell>
          {columnsRender}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableDataRow<T>
            handleRemoveItem={handleRemoveItem}
            handleEditItem={handleEditItem}
            columns={columns}
            key={item.id}
            item={item}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell sx={{ borderBottom: "none" }} colSpan={5}>
            <Button onClick={handleAddItem} color="primary">{addButtonLabel}</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}