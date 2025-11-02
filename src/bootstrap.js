import React from "react";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { registerRemotes } from "@module-federation/enhanced/runtime";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";

import App from "./App";
import cache from "./emotionCache";
import theme from "./theme";
import { federationConfig } from "./federationConfig";


const AppContainer = () => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </CacheProvider>
);

const mount = async (el) => {
  const config = federationConfig();
  if (config.remotes) {
    registerRemotes(config.remotes);
  }
  createRoot(el).render(<AppContainer />);
};

const rootEl = document.getElementById("container-root");
if (rootEl) {
  mount(rootEl);
}

export { mount };
export default AppContainer;
