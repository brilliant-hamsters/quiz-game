import React from 'react'
import { routes } from './routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ComponentWithAuthorization } from './utils/hoc/ComponentWithAuthorization'
import { ThemeProvider } from './providers/ThemeProvider'

export const App = () => {
  return (
    <ThemeProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              const { component, path, isPrivate } = route
              const Page = <ComponentWithAuthorization Component={component} isPrivate={isPrivate}/>
              return <Route key={index} path={path} element={Page}/>
            })}
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </ThemeProvider>
  )
}
