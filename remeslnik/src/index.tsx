import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { TopHeader } from './components/Layout';
import { AddContractor } from './components/AddContractor';
import { AddContractorPage } from './pages/AddContractor';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopHeader />,
    children: [
      {
        path: '/',
        element: <ProfilePage />
      },
      {
        path: '/add-contractor',
        element: <AddContractor />
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

// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
