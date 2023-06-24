import { tryLoadAndStartRecorder } from "@alwaysmeticulous/recorder-loader";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import TagManager from "react-gtm-module";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import WebSocketProvider from "./context/WebSocketContext.tsx";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { persistor, store } from "./state/store.tsx";
import theme from "./theme";

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_GTM_ID,
};

TagManager.initialize(tagManagerArgs);
const init = async () => {
  const projectId = import.meta.env.VITE_METICULOUS_PROJECT_ID;
  await tryLoadAndStartRecorder({
    projectId,
  });
};
init();

const client = new ApolloClient({
  uri: "https://api.hashnode.com",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider dense maxSnack={3}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <WebSocketProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </WebSocketProvider>
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// Register Service Worker on Production
const onUpdate = (registration: unknown) => {
  console.log({ registration });
};
const onSuccess = (registration: unknown) => {
  console.log({ registration });
};
console.log({ PROCESS: process.env.NODE_ENV });
if (process.env.NODE_ENV === "production") {
  serviceWorker.register({ onUpdate, onSuccess });
} else {
  serviceWorker.unregister();
}
