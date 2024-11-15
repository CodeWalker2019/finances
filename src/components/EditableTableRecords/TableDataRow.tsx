import { TableRow, TableCell, TextField, Input, InputAdornment, IconButton, debounce } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { Column, ItemId } from "./EditableTableRecordsComponent";

interface IncomeSourceItemProps<T extends ItemId> {
  handleRemoveItem: (item: T) => void
  handleEditItem: (item: T) => void
  columns: Column[]
  item: T
}

export default function IncomeSourceTable<T extends ItemId>({
  handleRemoveItem,
  handleEditItem,
  columns,
  item,
}: IncomeSourceItemProps<T>) {
  function handleRemove() {
    handleRemoveItem(item)
  }

  function handleUpdate(event: React.ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement
    const parsedValue = Number.parseFloat(value)
    const updated: Record<string, string | number> = { ...item, [name]: parsedValue };
    if (Number.isNaN(parsedValue)) updated[name] = value
    handleEditItem(updated as T)
  }

  function getContent(index: number, column: Column) {
    const value = item[column.accessor as keyof T];

    if (index === 0) {
      return (
        <TextField
          autoFocus
          fullWidth
          name={column.accessor}
          variant="standard"
          value={value}
          onChange={handleUpdate}
          slotProps={{ input: { disableUnderline: true } }}
        />
      )
    }

    const adorment = column.adorment ? <InputAdornment position="end">{column.adorment}</InputAdornment> : undefined

    return (
      <Input
        fullWidth
        name="value"
        type="number"
        disableUnderline
        value={value}
        disabled={!column.editable}
        onChange={handleUpdate}
        endAdornment={adorment}
        inputProps={{ style: { textAlign: 'right' }}}
      />
    )
  }

  return (
    <TableRow>
      <TableCell>
        <IconButton color="primary" onClick={handleRemove} aria-label="delete">
          <ClearIcon />
        </IconButton>
      </TableCell>
      {columns.map((c, i) => (
        <TableCell key={`${item.id}${c.accessor}`}>
          {getContent(i, c)}
        </TableCell>
      ))}
    </TableRow>
  )
}
