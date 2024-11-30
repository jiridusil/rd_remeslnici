import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TopHeader } from "./components/Layout/Layout";
import { ContractorListPage } from "./pages/ContractorListPage";
import { ContractorProvider } from "./components/ContractorContext.ts/ContractorContext";
import { ContactPage } from "./pages/ContactPage";
import { AddContractorPage } from "./pages/AddContractorPage";
import { ThemeProvider } from "./components/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopHeader />,
    children: [
      {
        path: "/",
        element: <ContractorListPage />,
      },
      {
        path: "/add-contractor",
        element: <AddContractorPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ContractorProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ContractorProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
