import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/index'

import './variables.scss'
import './root.scss'

const app = <App />

createRoot(document.getElementById('root')).render(app)