import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TopHeader } from './components/Layout';
import { AddContractor } from './components/AddContractor';
import { ContractorListPage } from './pages/ContractorListPage';
import { ContractorProvider } from './components/ContractorContext';
import { ContactPage } from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopHeader />,
    children: [
      {
        path: '/',
        element: <ContractorListPage />
      },
      {
        path: '/add-contractor',
        element: <AddContractor />
      },
      { 
        path: '/contact',
        element: <ContactPage />
      }
    ]
  }

]);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ContractorProvider>
        <RouterProvider router={router} />
      </ContractorProvider>

    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
