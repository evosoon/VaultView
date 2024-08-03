import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import showErrorInfo from './error'
import { useNotification } from '@/hooks/useNotification'

import { h } from 'vue'

const baseURL = import.meta.env.VITE_BASE_URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    req.headers['Content-Type'] = 'application/json'
    if (localStorage.getItem('access_token'))
      req.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}` 
    return req
  },
  (err: any) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status >= 200 && res.status <300) {
      showErrorInfo(res.data)
      return res.data
    }
    return Promise.reject(res.data)
  },
  (err: any) => {
    console.log(err.response)
    useNotification('提示',err.response.data.data)

    showErrorInfo({ result_code: err.response.status })
  }
)

export default axiosInstance
