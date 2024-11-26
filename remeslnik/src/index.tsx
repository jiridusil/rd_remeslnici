import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TopHeader } from './components/Layout';
import { AddContractor } from './components/AddContractor';
import { Write } from './components/Write';
import { ContractorListPage } from './pages/ContractorListPage';

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
      { path:'/simple-insert',
        element: <Write />
      },
      {
        path: '/contractors',
        element: <ContractorListPage />
      }
    ]
  }

]);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
