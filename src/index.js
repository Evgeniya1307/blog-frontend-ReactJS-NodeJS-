import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //вытаскиваю проайдер
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import store from "./redux/store"; //вытаскиваю стор

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {/*обернула роутинг*/}
      <BrowserRouter>
        <Provider store={store}>{/*должен знать о стор */}
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>
);
