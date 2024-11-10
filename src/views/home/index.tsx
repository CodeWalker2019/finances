import { Container, IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import FinancesPieChart from "./FinancesPieChart";
import UnplannedExpanses from "./UnplannedExpanses";

export default function Home() {
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col gap-9">
      <div className="w-full flex items-center justify-between">
        <h2>Money Analysis</h2>
        <IconButton onClick={() => navigate('/settings')} aria-label="close">
            <SettingsIcon />
        </IconButton>
      </div>
      <FinancesPieChart />
      <UnplannedExpanses />
    </Container>
  )
}