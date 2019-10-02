import "typeface-roboto";
import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import primary from "@material-ui/core/colors/blueGrey";
import secondary from "@material-ui/core/colors/orange";

import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store";
import Routes from "./routes";

const theme = createMuiTheme({
  palette: {
    primary: { main: primary[600] },
    secondary
  }
});

const store = configureStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
