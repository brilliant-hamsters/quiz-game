import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { ErrorBoundary } from './components/core/ErrorBoundary'
import './index.scss'
//import { startServiceWorker } from './utils/serviceWorkers/initialServiceWorkers'

//startServiceWorker()

hydrateRoot(document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Что-то пошло не так...</p>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
