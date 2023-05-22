import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import App from '@src/App'

// import './variables.scss'
// import './root.scss'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import Layout from '@/routes/layout'

import Characters, {
  loader as charactersLoader,
} from '@/routes/characters'

import Character, {
  loader as characterLoader,
} from '@/routes/character'

import ErrorPage from './error-page'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, loader: () => redirect('/characters')  },
          {
            path: 'characters',
            element: <Characters />,
            loader: charactersLoader(queryClient),
          },
          {
            path: 'characters/:characterId',
            element: <Character />,
            loader: characterLoader(queryClient),
          },
        ],
      },
    ],
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
)
