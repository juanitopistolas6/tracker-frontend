import { NavLink, Outlet } from 'react-router-dom'
import { HeroIcons } from '../util/hero-icons'
import logo from '../util/logo.png'
import { useModal } from '../hooks/useModal'
import Modal from '../components/modals/modal'
import { LoginModal } from '../components/modals/login-modal'

export const RootLayout = () => {
  const { handleClose, handleOpen, open } = useModal()

  return (
    <>
      <Modal
        open={open}
        closeModal={handleClose}
        className="flex items-start top-1/2 transform -translate-y-1/2 justify-center w-full"
      >
        <LoginModal handleClose={handleClose} />
      </Modal>
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

            <button onClick={handleOpen}>
              <HeroIcons name="UserCircleIcon" className="w-12" />
            </button>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  )
}
