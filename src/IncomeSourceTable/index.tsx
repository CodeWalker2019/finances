import { Table, TableHead, TableRow, TableCell, Button, TableBody, TableFooter, Skeleton } from "@mui/material";
import TableDataRow from "./TableDataRow";
import monobankApi from "../api/monobank";
import jsonServerApi from "../api/jsonServer";
import { getUniqueName } from "../helpers";
import { INCOMES_SOUCE_INITIAL_NAME } from "../constants";

export default function IncomeSourceTable() {
  const { isLoading } = monobankApi.useGetUsdCurrencyQuery()
  const { data: incomeSources = [] } = jsonServerApi.useGetIncomeSourcesQuery()
  const [addIncomeSource] = jsonServerApi.useAddIncomeSourceMutation()

  function handleAddIncomeSource() {
    const names = incomeSources.map(s => s.source)
    addIncomeSource({
      source: getUniqueName(names, INCOMES_SOUCE_INITIAL_NAME),
      value: 0
    })
  }

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
  
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell width={3}></TableCell>
          <TableCell>Income Source</TableCell>
          <TableCell sx={{ width: 1/5 }} align="right">USD$</TableCell>
          <TableCell sx={{ width: 1/5 }} align="right">UAH</TableCell>
          <TableCell sx={{ width: 1/5 }} align="right">UAH Gross</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {incomeSources.map((incomeSource) => (
          <TableDataRow key={incomeSource.source} sourceData={incomeSource} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell sx={{ borderBottom: "none" }} colSpan={5}>
            <Button onClick={handleAddIncomeSource} color="primary">+ Add income source</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}