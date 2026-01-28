import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ErrorPage } from '../pages/ErrorPage.tsx'
import Login from '../pages/LoginPage.tsx'
import Register from '../pages/RegisterPage.tsx'
import HomePage from '../components/HomePage.tsx'
import UserPage from '../pages/UserPage.tsx'
import CreatePostPage from '../pages/CreatePostPage.tsx'
import PostPage from '../pages/PostPage.tsx'

import getposts from '../loaders/postLoader'
import userPosts from '../loaders/userPostLoader.ts'

import AuthContextProvider from '../context/authContext.tsx'
import Protected from './Protected.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: '/',
        element:<HomePage />,
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
  },
  {
    path: '/',
    element: <Protected />,
    children : [
      {
        path: '/profile',
        element: <UserPage />,
        loader: userPosts
      },
      {
        path:'/post',
        element: <CreatePostPage />
      },
      {
        path:'/post/:postid',
        element: <PostPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
