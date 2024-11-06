import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { RootLayout } from './layouts/root-layout'
import { HomePage } from './pages/home'
import { Calendar } from './pages/calendar'

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
