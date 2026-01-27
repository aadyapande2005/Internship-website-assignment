import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorPage } from './ErrorPage.tsx'
import Login from './Login.tsx'
import Register from './Register.tsx'
import PostPage from '../components/PostPage.tsx'
import getposts from '../loaders/postLoader'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: '/',
        element:<PostPage />,
        loader: getposts
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element:<Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
