import { routes } from './routes'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
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
  )
}
