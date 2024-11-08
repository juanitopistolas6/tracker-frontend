import { HeroIcons } from '../../util/hero-icons'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'

interface loginProps {
  handleClose: () => void
}

interface form {
  user: string
  password: string
}

export const LoginModal = (login: loginProps) => {
  const { handleClose } = login
  const { register } = useForm<form>()

  return (
    <div className="w-[350px] rounded-xl p-2 space-y-5 flex-col h-auto relative bg-white">
      <div className="flex justify-between">
        <button onClick={handleClose}>
          <HeroIcons name="XMarkIcon" />
        </button>
      </div>

      <form className="w-full flex-col flex px-8 space-y-2">
        <TextField
          id="outlined-password-input"
          label="User"
          type="text"
          {...register('user')}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          {...register('password')}
        />

        <button
          className="bg-black rounded-lg text-white h-10 font-bold"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}
