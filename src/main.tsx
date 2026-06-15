/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { theme } from "./theme";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme='light'>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
