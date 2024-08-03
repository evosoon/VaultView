import { useNotification } from '@/hooks/useNotification'
import axiosInstance from '@/utils/request/axios.ts'

export async function GetGoods(
  name?:string 
) {
  const res = await axiosInstance({
    url: '/goods/goods',
    method: 'GET',
    params:{
        name
    }
  })
  return res.data
}

export async function SetGoods(
    data:{
        name:string
        quantity:string | number
        price:string | number
    } 
  ) {
    const res = await axiosInstance({
      url: '/goods/goods',
      method: 'POST',
      data
    })
    useNotification('提示',res.data)
      if(res.status == 201) return true
      return false
  }


  export async function DelGoods(
    name:string 
  ) {
    const res = await axiosInstance({
      url: '/goods/goods',
      method: 'DELETE',
      params:{
          name
      }
    })
    console.log(res)
    useNotification('提示',res.data)
      if(res.status == 200) return true
      return false
  }