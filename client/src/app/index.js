import React from 'react';
import Routes from './routes';
import store from './store/store';
import {authCheck} from './modules/auth/authSlice';

function App() {
  store.dispatch(authCheck());
  return <Routes/>
}

export default App;
