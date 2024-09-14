import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './App';
import MainLayout from './clientWarp';
import './assets/main.css';
import Post from './components/post';
import LoginPage from './page/Login';
import Register from './page/Register';
import Data from './page/data';
import ProtectedRoute from './hooks/route'; 
import Chat from './page/Chat';

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
        path: '/post',
        element: <Post/>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/chat',
        element: <Chat />
      },
      {
        path: '/data',
        element: (
          <ProtectedRoute>
            <Data />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
