import { HeroIcons } from '../../util/hero-icons'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/auth-context'
import { useState } from 'react'

interface loginProps {
  handleClose: () => void
  openRegister: () => void
}

interface form {
  user: string
  password: string
}

const LoginModal = (loginProps: loginProps) => {
  const { handleClose, openRegister } = loginProps
  const { login, isLoading, error } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<form>()
  const [showPassword, setShowPassword] = useState(false)

  function submit() {
    const payload = getValues()
    login(payload)
  }

  return (
    <div className="w-[420px] rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col h-auto">
      {/* Header con gradiente */}
      <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative flex-shrink-0">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <HeroIcons name="XMarkIcon" className="w-6 h-6 text-white" />
        </button>
        <div className="absolute bottom-0 left-8 translate-y-1/2">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <HeroIcons name="UserCircleIcon" className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Contenido del formulario */}
      <div className="pt-10 px-8 pb-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Inicia sesión
          </h1>
          <p className="text-gray-500 text-sm">
            Bienvenido de vuelta a tu gestor de gastos
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <HeroIcons
              name="ExclamationTriangleIcon"
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
            />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3.5">
                <HeroIcons name="UserIcon" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                {...register('user', { required: 'El usuario es requerido' })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
            {errors.user && (
              <p className="mt-1 text-sm text-red-500">{errors.user.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3.5">
                <HeroIcons
                  name="LockClosedIcon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                {...register('password', {
                  required: 'La contraseña es requerida',
                })}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <HeroIcons
                  name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Iniciando...
              </>
            ) : (
              <>
                <HeroIcons name="ArrowRightIcon" className="w-5 h-5" />
                Iniciar sesión
              </>
            )}
          </button>
        </form>

        {/* Divisor */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">¿Nuevo usuario?</span>
          </div>
        </div>

        {/* Botón de registro */}
        <button
          onClick={() => {
            handleClose()
            openRegister()
          }}
          className="w-full px-4 py-2.5 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  )
}

export default LoginModal
