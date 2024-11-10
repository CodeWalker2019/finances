import { TableCell } from "@mui/material"
import { Column, ItemId } from "."

interface ColumnHeaderProps {
  column: Column
  index: number
}

export default function ColumnHeader({ index, column }: ColumnHeaderProps) {
  function getSx(index: number) {
    if (index === 0) return undefined
    return { width: 1/5 }
  }

  function getAlign(index: number) {
    if (index === 0) return undefined
    return 'right'
  }

  return (
    <TableCell
      align={getAlign(index)}
      sx={getSx(index)}
    >
      {column.label}
    </TableCell>
  )
}