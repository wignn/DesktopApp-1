// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './App';
import PageData from './data/page';
import MainLayout from './clientWarp'; // Import layout
import './assets/main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/data',
        element: <PageData />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
