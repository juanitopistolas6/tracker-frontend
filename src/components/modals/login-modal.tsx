import { HeroIcons } from '../../util/hero-icons'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/auth-context'
import { useEffect } from 'react'

interface loginProps {
  handleClose: () => void
}

interface form {
  user: string
  password: string
}

const LoginModal = (loginProps: loginProps) => {
  const { handleClose } = loginProps
  const { login, loginSuccess, error } = useAuth()
  const { register, handleSubmit, getValues } = useForm<form>()

  useEffect(() => {
    if (!loginSuccess) return

    handleClose()
  }, [loginSuccess])

  function submit() {
    const payload = getValues()

    login(payload)
  }

  return (
    <div className="w-[350px] rounded-xl p-2 space-y-5 flex-col h-auto relative bg-white">
      <div className="flex justify-between">
        <button onClick={handleClose}>
          <HeroIcons name="XMarkIcon" />
        </button>
      </div>

      <form
        className="w-full flex-col flex px-8 space-y-2"
        onSubmit={handleSubmit(submit)}
      >
        {error && (
          <span className="py-2 mb-2 bg-red-600 text-white text-center">
            {error}
          </span>
        )}

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

export default LoginModal
