import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { clearCache } from './utils/apiCache.js'

const noop = () => {}

if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  console.log = noop
  console.info = noop
  console.debug = noop
  console.warn = noop
  console.error = noop
}

// Clear cache on app initialization to ensure fresh data from DB
clearCache().then(() => {
  console.log('Cache cleared on app initialization');
}).catch((error) => {
  console.error('Failed to clear cache on initialization:', error);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
