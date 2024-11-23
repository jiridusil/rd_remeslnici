import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { TopHeader } from './components/Layout';
import { AddContractor } from './components/AddContractor';
import { Write } from './components/Write';

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
      },
      { path:'/simple-insert',
        element: <Write />
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
