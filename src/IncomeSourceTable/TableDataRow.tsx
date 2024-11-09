import { TableRow, TableCell, TextField, Input, InputAdornment, IconButton } from "@mui/material";
import { IncomeSource } from "../types";
import ClearIcon from '@mui/icons-material/Clear';
import monobankApi from "../api/monobank";
import { useMemo } from "react";
import { getGross, twoValuesAfterCommaRound } from "../helpers";
import jsonServerApi from "../api/jsonServer";

export default function IncomeSourceTable({ sourceData }: { sourceData: IncomeSource }) {
  const { data: usdData } = monobankApi.useGetUsdCurrencyQuery()
  const [removeIncomeSource] = jsonServerApi.useRemoveIncomeSourceMutation()
  const [updateIncomeSource] = jsonServerApi.useUpdateIncomeSourceMutation()

  const uahValue = useMemo(() => {
    if (!usdData) return
    const uah = usdData.rateSell * sourceData.value
    return twoValuesAfterCommaRound(uah)
  }, [usdData, sourceData.value])

  const uahGrossValue = useMemo(() => {
    if (!uahValue) return
    return twoValuesAfterCommaRound(getGross(uahValue))
  }, [uahValue])

  function handleRemoveIncomeSource() {
    removeIncomeSource(sourceData.id)
  }

  function handleUpdateIncomeSource(event: React.ChangeEvent) {
    const { name, value } = event.target as HTMLInputElement
    updateIncomeSource({ ...sourceData, [name]: value })
  }

  return (
    <TableRow>
      <TableCell>
        <IconButton color="primary" onClick={handleRemoveIncomeSource} aria-label="delete">
          <ClearIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <TextField
          autoFocus
          fullWidth
          name="source"
          variant="standard"
          value={sourceData.source}
          onChange={handleUpdateIncomeSource}
          slotProps={{ input: { disableUnderline: true } }}
        />
      </TableCell>
      <TableCell sx={{ width: 1/5 }} align="right">
        <Input
          name="value"
          type="number"
          disableUnderline
          fullWidth
          value={sourceData.value}
          onChange={handleUpdateIncomeSource}
          inputProps={{ style: { textAlign: 'right' }}}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
        />
      </TableCell>
      <TableCell sx={{ width: 1/5 }} align="right">{uahValue}</TableCell>
      <TableCell sx={{ width: 1/5 }} align="right">{uahGrossValue}</TableCell>
    </TableRow>
  )
}
