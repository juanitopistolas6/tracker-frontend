import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAxios } from '../hooks/useAxios'
import cookies from 'js-cookie'
import {
  ILoginPayload,
  IResponse,
  IUser,
  ILoginResponse,
  IUserStats,
  IRegister,
} from '../util/interfaces'
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast, TypeOptions } from 'react-toastify'

interface IAuthValues {
  user: IUser | null
  stats: IResponse<IUserStats> | undefined
  isAuthenticated: boolean
  isLoading: boolean
  loginSuccess: boolean
  registerUser: UseMutateFunction<any, Error, IRegister, unknown>
  logout: () => void
  login: UseMutateFunction<
    IResponse<ILoginResponse>,
    Error,
    ILoginPayload,
    unknown
  >
  refetchStats: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponse<IUserStats>, Error>>
}

const authContext = createContext<IAuthValues | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios()
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const queryClient = useQueryClient()

  // Verificar si hay token al montar el componente
  useEffect(() => {
    const token = cookies.get('token')
    if (token) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [])

  const notify = (message: string, type: TypeOptions) => {
    toast(message, { type })
  }

  const logout = () => {
    cookies.remove('token')
    setUser(null)
    setAuthenticated(false)
    notify('Sesión cerrada exitosamente', 'success')
  }

  const { mutate: login, isSuccess: loginSuccess } = useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      setIsLoading(true)
      const response = await axios.post<IResponse<ILoginResponse>>(
        '/auth/login',
        payload
      )

      return response.data
    },
    onSuccess: (response) => {
      const { data } = response

      setUser(data.user)

      cookies.set('token', data.token)

      setAuthenticated(true)
    },
    onError: () => {
      setUser(null)

      setAuthenticated(false)

      notify('Error al iniciar sesion', 'error')
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const { mutate: registerUser } = useMutation({
    mutationFn: async (register: IRegister) => {
      setIsLoading(true)
      const response = await axios.post('/auth', register)

      return response.data
    },
    onSuccess: () => {
      console.log('conseguido!!!')
      notify('Usuario registrado exitosamente', 'success')
    },
    onError: (error) => {
      console.log(error)
      notify('Ha habido un error al registrar el usuario', 'error')
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['stats'],
    enabled: !!isAuthenticated,
    queryFn: async () => {
      const response = await axios.get<IResponse<IUserStats>>('/user/stats')

      const { data } = response

      return data
    },
  })

  const {
    data: token,
    isSuccess,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useQuery({
    queryKey: ['token'],
    enabled: !!cookies.get('token'),
    queryFn: async () => {
      const response = await axios.post<IResponse<IUser>>('/auth/token')
      console.log('Token fetched', response)

      return response.data
    },
    retry: false,
  })

  useEffect(() => {
    // Si no hay token, no hay nada que verificar
    if (!cookies.get('token')) {
      setIsLoading(false)
      setUser(null)
      setAuthenticated(false)
      return
    }

    // Si el token se está cargando
    if (isTokenLoading) {
      setIsLoading(true)
      return
    }

    // Si hay error al obtener el token, limpiar
    if (isTokenError) {
      setUser(null)
      setAuthenticated(false)
      setIsLoading(false)
      cookies.remove('token')
      return
    }

    // Si la solicitud fue exitosa pero no hay datos
    if (!isSuccess || !token) {
      setUser(null)
      setAuthenticated(false)
      setIsLoading(false)
      return
    }

    // Token válido, establecer usuario como autenticado
    console.log('Setting user from token...', token)
    setUser(token.data)
    setAuthenticated(true)
    setIsLoading(false)
  }, [token, isSuccess, isTokenLoading, isTokenError])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      queryClient.resetQueries({ queryKey: ['stats'] })
    }
  }, [isAuthenticated, isLoading])

  const values: IAuthValues = {
    user,
    stats,
    isAuthenticated,
    isLoading,
    loginSuccess,
    login,
    logout,
    refetchStats,
    registerUser,
  }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) throw new Error('AuthContext must be within its reach')

  return context
}
