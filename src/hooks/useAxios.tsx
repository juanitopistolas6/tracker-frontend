import Axios from 'axios'
import Cookies from 'js-cookie'

export const useAxios = () => {
  const axios = Axios.create({
    baseURL: 'https://tracklist-backend-production.up.railway.app',
  })

  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token')

      if (!token) return config

      config.headers['Authorization'] = `Bearer ${token}`

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return { axios }
}
