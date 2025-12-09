import { useAuth } from '@/context/auth-context'
import { useModal } from '@/hooks/useModal'
import { HeroIcons } from '@/util/hero-icons'
import { useState, lazy, Suspense, useEffect } from 'react'
import { Wait } from '@/components/backdrop'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const {
    handleOpen: openLogin,
    handleClose: closeLogin,
    open: openLoginModal,
  } = useModal()
  const {
    handleOpen: openRegister,
    handleClose: closeRegister,
    open: openRegisterModal,
  } = useModal()
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const Modal = lazy(() => import('../components/modals/modal'))
  const LoginModal = lazy(() => import('../components/modals/login-modal'))
  const RegisterModal = lazy(
    () => import('../components/modals/register-modal')
  )

  return (
    <>
      <Suspense fallback={<Wait />}>
        {openLoginModal && (
          <Modal
            open={openLoginModal}
            closeModal={closeLogin}
            className="flex items-center justify-center w-full"
          >
            <LoginModal handleClose={closeLogin} openRegister={openRegister} />
          </Modal>
        )}
      </Suspense>

      <Suspense fallback={<Wait />}>
        {openRegisterModal && (
          <Modal
            open={openRegisterModal}
            closeModal={closeRegister}
            className="flex items-center justify-center w-full"
          >
            <RegisterModal />
          </Modal>
        )}
      </Suspense>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
              <HeroIcons name="CreditCardIcon" className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Gestiona tus gastos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                de forma inteligente
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Controla tu dinero, visualiza tus hábitos de gasto y alcanza tus
              objetivos financieros con nuestro rastreador inteligente.
            </p>

            <button
              onClick={openLogin}
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Comenzar ahora
            </button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 my-20">
            {[
              {
                id: 'track',
                icon: 'PlusCircleIcon',
                title: 'Registra tus gastos',
                description:
                  'Añade rápidamente cada gasto y categorízalos para un mejor control.',
              },
              {
                id: 'analyze',
                icon: 'ListBulletIcon',
                title: 'Visualiza datos',
                description:
                  'Mira un resumen completo de tus transacciones y balances.',
              },
              {
                id: 'plan',
                icon: 'CalendarDaysIcon',
                title: 'Planifica finanzas',
                description:
                  'Establece objetivos y monitorea tu progreso mes a mes.',
              },
            ].map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`p-8 rounded-2xl bg-white transition-all duration-300 transform ${
                  hoveredFeature === feature.id
                    ? 'shadow-2xl scale-105 border-indigo-200'
                    : 'shadow-md border border-gray-100 hover:shadow-xl'
                }`}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                  <HeroIcons
                    name={feature.icon as any}
                    className="w-7 h-7 text-indigo-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 my-20 text-center">
            {[
              { value: '10K+', label: 'Usuarios activos' },
              { value: '1M+', label: 'Transacciones' },
              { value: '24/7', label: 'Disponible' },
              { value: '100%', label: 'Seguro' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ¿Listo para tomar control de tus finanzas?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
              Únete a miles de usuarios que ya están mejorando su salud
              financiera.
            </p>
            <button
              onClick={openRegister}
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300"
            >
              Crear cuenta gratis
            </button>
          </div>

          {/* Features Deep Dive */}
          <div className="my-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              ¿Por qué elegir nuestro tracker?
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Interfaz intuitiva',
                  description:
                    'Diseño limpio y moderno que hace fácil registrar y visualizar tus gastos en segundos.',
                  icon: 'SparklesIcon',
                },
                {
                  title: 'Categorías personalizables',
                  description:
                    'Crea categorías que se adapten a tu estilo de vida y necesidades específicas.',
                  icon: 'FunnelIcon',
                },
                {
                  title: 'Reportes detallados',
                  description:
                    'Obtén insights profundos sobre tus patrones de gasto con gráficos y estadísticas.',
                  icon: 'DocumentTextIcon',
                },
                {
                  title: 'Datos protegidos',
                  description:
                    'Tu información está encriptada y protegida con los más altos estándares de seguridad.',
                  icon: 'ShieldCheckIcon',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <HeroIcons
                        name={item.icon as any}
                        className="w-6 h-6 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="mb-4">
              © 2025 ExpenseTracker. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-400">
              Tu aliado en la gestión financiera personal
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
