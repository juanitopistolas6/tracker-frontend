import { useAuth } from '@/context/auth-context'
import { IRegister } from '@/util/interfaces'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { HeroIcons } from '../../util/hero-icons'

const RegisterForm = () => {
  const { registerUser, isLoading } = useAuth()
  const {
    control,
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister>()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: IRegister) => {
    const cleanedPaymentDays = data.paymentDays.filter(
      (day) => typeof day === 'number' && !isNaN(day)
    )

    registerUser({ ...data, paymentDays: cleanedPaymentDays })
  }

  const payment = watch('paymentFrequency')

  return (
    <div className="w-[500px] max-w-[90vw] rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col max-h-[95vh]">
      {/* Header con gradiente */}
      <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative flex-shrink-0">
        <div className="absolute bottom-0 left-8 translate-y-1/2">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <HeroIcons name="UserPlusIcon" className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Contenido del formulario */}
      <div className="pt-10 px-8 pb-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Crear cuenta
          </h1>
          <p className="text-gray-500 text-sm">
            Únete a nuestra comunidad de gestión de gastos
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <HeroIcons name="UserIcon" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Elige un nombre de usuario"
                {...register('user', { required: 'El usuario es requerido' })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
            {errors.user && (
              <p className="mt-1 text-sm text-red-500">{errors.user.message}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <HeroIcons
                  name="IdentificationIcon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type="text"
                placeholder="Tu nombre"
                {...register('name', { required: 'El nombre es requerido' })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <HeroIcons
                  name="LockClosedIcon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contraseña segura"
                {...register('password', {
                  required: 'La contraseña es requerida',
                })}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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

          {/* Salario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salario mensual
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <HeroIcons
                  name="CurrencyDollarIcon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type="number"
                placeholder="0.00"
                {...register('salary', {
                  required: 'El salario es requerido',
                  valueAsNumber: true,
                })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
            {errors.salary && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balance inicial
            </label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <HeroIcons
                  name="CreditCardIcon"
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type="number"
                placeholder="0.00"
                {...register('balance', {
                  required: 'El balance es requerido',
                  valueAsNumber: true,
                })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>
            {errors.balance && (
              <p className="mt-1 text-sm text-red-500">
                {errors.balance.message}
              </p>
            )}
          </div>

          {/* Tipo de pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frecuencia de pago
            </label>
            <Controller
              name="paymentFrequency"
              control={control}
              rules={{ required: 'Selecciona una frecuencia' }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quincenal</option>
                </select>
              )}
            />
            {errors.paymentFrequency && (
              <p className="mt-1 text-sm text-red-500">
                {errors.paymentFrequency.message}
              </p>
            )}
          </div>

          {/* Días de pago */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {payment === 'weekly' ? 'Día de la semana' : 'Primer día'}
              </label>
              <input
                type="number"
                placeholder={payment === 'weekly' ? '1-7' : 'Día del mes'}
                {...register('paymentDays.0', {
                  valueAsNumber: true,
                  required: 'Requerido',
                })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              {errors.paymentDays?.[0] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.paymentDays[0].message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Segundo día
              </label>
              <input
                type="number"
                placeholder="Día del mes"
                disabled={payment === 'weekly'}
                {...register('paymentDays.1', {
                  valueAsNumber: true,
                  validate: {
                    notTooHigh: (value) => {
                      if (value && value >= 31) return 'Debe ser menor a 31'
                      return true
                    },
                  },
                })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              />
              {errors.paymentDays?.[1] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.paymentDays[1].message}
                </p>
              )}
            </div>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registrando...
              </>
            ) : (
              <>
                <HeroIcons name="CheckCircleIcon" className="w-5 h-5" />
                Crear cuenta
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
