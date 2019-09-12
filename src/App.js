import React from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import {
  BrowserRouter as Router, Route,
  Switch
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

// import pages
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage';

import theme from './config/theme';

import './App.css';
import RouteGuard from './components/RouterGuard/RouteGuard';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" component={AuthPage} />
              <RouteGuard exact path="/home" component={HomePage} authenticated/>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
