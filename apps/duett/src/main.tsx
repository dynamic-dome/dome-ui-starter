import "@dome/ui/styles.css";
import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@dome/ui";

import { App } from "./App";
import { RunListPage } from "./pages/RunListPage";
import { RunDetailPage } from "./pages/RunDetailPage";
import { SpendPage } from "./pages/SpendPage";
import { SycophancyPage } from "./pages/SycophancyPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme="dark">
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<RunListPage />} />
            <Route path="run/:id" element={<RunDetailPage />} />
            <Route path="spend" element={<SpendPage />} />
            <Route path="sycophancy" element={<SycophancyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
