import axiosInstance from '@/utils/request/axios.ts'
export async function GetRecord(
  type?:string 
) {
  const res = await axiosInstance({
    url: '/goods/record',
    method: 'GET',
    params:{
        type
    }
  })
  return res.data
}
