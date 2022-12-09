import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './configs/Theme/configureTheme';
import { store, persistor } from './configs/store';
import { Provider as ReduxProvide } from 'react-redux';
import GlobalStyle from './configs/Theme/globalStyle';
import { ThemeProvider } from '@mui/styles';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvide store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <GlobalStyle />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvide>
  </BrowserRouter>,
  document.getElementById('root')
);

