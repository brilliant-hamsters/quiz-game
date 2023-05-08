import React from 'react'
import { routes } from './routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              const { component, path } = route
              const Page = component
              return <Route key={index} path={path} element={<Page />} />
            })}
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
