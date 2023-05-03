import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.scss'
// import { startServiceWorker } from './utils/serviceWorkers/initialServiceWorkers'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { createStore } from './store'
import React from 'react'
import { ErrorBoundary } from './components/core/ErrorBoundary'

// startServiceWorker()

const store = createStore()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ErrorBoundary fallback={<p>Что-то полшло не так...</p>}>
          <App />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
