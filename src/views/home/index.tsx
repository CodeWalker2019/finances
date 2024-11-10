import { Container, IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()

  return (
    <Container>
      <div className="w-full flex items-center justify-end">
        <IconButton onClick={() => navigate('/settings')} aria-label="close">
            <SettingsIcon />
        </IconButton>
      </div>
    </Container>
  )
}