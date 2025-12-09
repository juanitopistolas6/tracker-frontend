import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { RootLayout } from './layouts/root-layout'
import { AuthenticatedHomePage } from './pages/home'
import { Calendar } from './pages/calendar'
import { CalendarDaily } from './pages/calendar-daily'
import { CalendarDailyProvider } from './context/calendar-daily'
import { ProtectedRoute } from './components/protected-route'
import { Landing } from './pages/landing'

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthenticatedHomePage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route
            path="calendar/:date"
            element={
              <CalendarDailyProvider>
                <CalendarDaily />
              </CalendarDailyProvider>
            }
          />
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
