import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";

import "./App.css";
import store from "./stores";

function App(): React.ReactElement {
  const queryClientRef: any = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClientRef.current}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="articles">
              <Route path=":id" element={<ArticleDetail />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
