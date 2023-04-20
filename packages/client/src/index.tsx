import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ErrorBoundary } from './components/core/ErrorBoundary'
import './index.scss'
import { startServiceWorker } from './utils/serviceWorkers/initialServiceWorkers'

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Что-то полшло не так...</p>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
