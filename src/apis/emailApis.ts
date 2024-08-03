import { useNotification } from '@/hooks/useNotification'
import axiosInstance from '@/utils/request/axios.ts'

export async function RegisterCaptcha(
  address:string 
) {
  const res = await axiosInstance({
    url: '/email/signup_captcha',
    method: 'get',
    params:{
        address
    }
  })
  useNotification('提示',res.data)

}