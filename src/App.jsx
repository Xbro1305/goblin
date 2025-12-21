import React from "react";
import { Router } from "./Router";
import { Header } from "./Components/Header/Header";
import { SnackbarProvider } from "notistack";

export const App = () => {
  return (
    <SnackbarProvider autoHideDuration={3000} maxSnack={3} className="app">
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signin" && <Header />}
      <Router />
    </SnackbarProvider>
  );
};
