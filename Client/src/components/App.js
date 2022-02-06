import React from 'react'
import { ThemeProvider } from '@material-ui/styles'

import theme from './ui/Theme'
import { CssBaseline } from '@material-ui/core'
// routes
import { Routes } from './Routes';

function App() {

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
    </ThemeProvider>
  );
}

export default App;
