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
} from '../util/interfaces'
import { UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query'

interface IAuthValues {
  user: IUser | null
  isAuthenticated: boolean
  loginSuccess: boolean
  error: string | null
  login: UseMutateFunction<
    IResponse<ILoginResponse>,
    Error,
    ILoginPayload,
    unknown
  >
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
    isAuthenticated,
    login,
    error,
    loginSuccess,
  }

  return <authContext.Provider value={values}>{children}</authContext.Provider>
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) throw new Error('AuthContext must be within its reach')

  return context
}
