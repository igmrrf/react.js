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
import { Provider } from "react-redux";
import App from "./App.tsx";
import { WebSocketProvider, socket } from "./context/WebSocketContext.tsx";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store.tsx";
import theme from "./theme";

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
            <WebSocketProvider value={socket}>
              <App />
            </WebSocketProvider>
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// Register Service Worker on Production
const onUpdate = (registration: any) => {
  console.log({ registration });
};
const onSuccess = (registration: any) => {
  console.log({ registration });
};
if (process.env.NODE_ENV === "production") {
  serviceWorker.register({ onUpdate, onSuccess });
} else {
  serviceWorker.unregister();
}
