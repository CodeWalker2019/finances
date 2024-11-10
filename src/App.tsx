import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Router from './routes';
import { Container } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <Container className='p-5'>
        <Router />
      </Container>
    </Provider>
  );
}

export default App;
