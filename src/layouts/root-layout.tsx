import { NavLink, Outlet } from 'react-router-dom'
import { HeroIcons } from '../util/hero-icons'
import logo from '../util/logo.png'

export const RootLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="w-[1100px] flex-col  font-roboto">
        <div className="my-3 flex justify-between items-center w-full pb-5">
          <img src={logo} height={3} />

          <div className="flex justify-between gap-5">
            <NavLink
              to="/"
              className="flex gap-1 hover:bg-gray-200 p-2 rounded-xl font-semibold"
            >
              <HeroIcons name="HomeIcon" className="h-6 w-6 " stroke={2} />
              <h1>Home</h1>
            </NavLink>

            <NavLink
              to="calendar"
              className="flex gap-1 hover:bg-gray-200 p-2 rounded-xl font-semibold"
            >
              <HeroIcons name="CalendarIcon" className="h-6 w-6" stroke={2} />
              <h1>Calendar</h1>
            </NavLink>
          </div>

          <HeroIcons name="UserCircleIcon" className="w-12" />
        </div>

        <Outlet />
      </div>
    </div>
  )
}
