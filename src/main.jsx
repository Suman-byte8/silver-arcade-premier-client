import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const noop = () => {}

if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  console.log = noop
  console.info = noop
  console.debug = noop
  console.warn = noop
  console.error = noop
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
