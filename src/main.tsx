import React from 'react'
import ReactDOM from 'react-dom/client'

// import App from '@src/App'

// import './variables.scss'
// import './root.scss'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Root, {
  loader as rootLoader,
} from '@/routes/root'

import Hero, {
  loader as contactLoader,
} from './routes/hero'

import Index from './routes/index'

import ErrorPage from './error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'heroes/:heroId',
            element: <Hero />,
            loader: contactLoader,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)