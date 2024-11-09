import { Container, Table, TableCell, TableHead, TableRow } from '@mui/material';
import './App.css';
import IncomeSourceTable from './IncomeSourceTable';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <h1>Finances</h1>
        <IncomeSourceTable />
      </Container>
    </Provider>
  );
}

export default App;
