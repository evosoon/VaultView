import { useNotification } from '@/hooks/useNotification'
import axiosInstance from '@/utils/request/axios.ts'
// 用户列表 - 获取
export async function Login(data: {
  username:string
  password:string 
}) {
  const res =  await axiosInstance({
    url: '/user/login',
    method: 'POST',
    data
  })
  if(res.status === 201)
    useNotification('提示','登录成功')
    return res  
}

export async function Register(data:{
  username:string
  password:string
  nickname:string
  email:string
  captcha:string | number
}) {
  const res =  await axiosInstance({
    url: '/user/register',
    method: 'POST',
    data
  })
  if(res.status === 201)
    useNotification('提示','注册成功')

    return res
}

export async function GetList() {
  const res =  await axiosInstance({
    url: '/user/list',
    method: 'GET',
  })
  if(res.status === 200)
    return res.data
}

export async function AddFriend(id:number) {
  const res =  await axiosInstance({
    url: '/social/friend',
    method: 'POST',
    data:{
      id,
      friendGroup: "默认分组"
    }
  })
  if(res.status === 201)
    if(res.status == 201) return true
    return res.data
}

export async function GetFriend() {
  const res =  await axiosInstance({
    url: '/social/friend',
    method: 'GET',
  })
  if(res.status === 200)
    return res.data
}

export async function DelFriend(friendId:number) {
  const res =  await axiosInstance({
    url: '/social/friend',
    method: 'DELETE',
    params:{
      friendId
    }
  })
  if(res.status === 200)
    useNotification('提示',res.data)
    return res.data
}