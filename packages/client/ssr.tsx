import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Location } from 'react-router'
import { StaticRouter } from 'react-router-dom/server'
// import { App } from './src/App'

import { ErrorBoundary } from './src/components/core/ErrorBoundary'

export function render(url: string | Partial<Location>) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <ErrorBoundary fallback={<p>Что-то полшло не так...</p>}>
        <StaticRouter location={url}>{/* <App /> */}</StaticRouter>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
