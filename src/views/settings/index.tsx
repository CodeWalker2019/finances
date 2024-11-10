import { Container, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ExpansesTable from "./ExpansesTable";
import IncomeSourceTable from "./IncomeSourceTable";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <h1>Finances</h1>
        <IconButton onClick={() => navigate(-1)} aria-label="close">
            <ClearIcon />
        </IconButton>
      </div>
      <h3>Income</h3>
      <IncomeSourceTable />
      <h3>Monthly Expanses</h3>
      <ExpansesTable />
    </Container>
  )
}