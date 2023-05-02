import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.scss'
// import { startServiceWorker } from './utils/serviceWorkers/initialServiceWorkers'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import store from './store'

// startServiceWorker()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
)
