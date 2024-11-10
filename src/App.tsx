import { Card, Container, Table, TableCell, TableHead, TableRow } from '@mui/material';
import './App.css';
import IncomeSourceTable from './views/IncomeSourceTable';
import { Provider } from 'react-redux';
import store from './store';
import ExpansesTable from './views/ExpansesTable';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <h1>Finances</h1>
        <h3>Income</h3>
        <IncomeSourceTable />
        <h3>Monthly Expanses</h3>
        <ExpansesTable />
      </Container>
    </Provider>
  );
}

export default App;
