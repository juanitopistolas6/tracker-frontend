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
} from '../util/interfaces'
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

interface IAuthValues {
  user: IUser | null
  stats: IResponse<IUserStats> | undefined
  isAuthenticated: boolean
  loginSuccess: boolean
  error: string | null
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
  const [error, setError] = useState<string | null>(null)

  const { mutate: login, isSuccess: loginSuccess } = useMutation({
    mutationFn: async (payload: ILoginPayload) => {
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
    onError: (error) => {
      setUser(null)

      setAuthenticated(false)

      setError(error.message)
    },
  })

  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['stats'],
    enabled: !!isAuthenticated,
    queryFn: async () => {
      const response = await axios.get<IResponse<IUserStats>>('/user/stats')

      return response.data
    },
  })

  const { data: token, isSuccess } = useQuery({
    queryKey: ['token'],
    enabled: !!cookies.get('token'),
    queryFn: async () => {
      const response = await axios.post<IResponse<IUser>>('/auth/token')

      return response.data
    },
  })

  useEffect(() => {
    if (!isSuccess) return

    if (!token) {
      setUser(null)
      setAuthenticated(false)
      return
    }

    setUser(token.data)
    setAuthenticated(true)
  }, [token])

  const values: IAuthValues = {
    user,
    stats,
    isAuthenticated,
    error,
    loginSuccess,
    login,
    refetchStats,
  }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) throw new Error('AuthContext must be within its reach')

  return context
}
