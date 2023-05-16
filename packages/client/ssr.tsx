import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Location } from 'react-router'
import { StaticRouter } from 'react-router-dom/server'
import { routes } from './src/routes'

import { ErrorBoundary } from './src/components/core/ErrorBoundary'
import { Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { createStore } from './src/store'

export { createStore }

export function render(url: string | Partial<Location>, store: Store) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ErrorBoundary fallback={<p>Что-то пошло не так...</p>}>
          <StaticRouter location={url}>
            {routes
              .filter(route => {
                const { path } = route
                return path === url
              })
              .map((route, i) => {
                const { component } = route
                const Page = component
                return <Page key={i} />
              })}
          </StaticRouter>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  )
}
