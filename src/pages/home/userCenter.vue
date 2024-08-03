<template>
    <div class="box">
    <div class="search color flex">
      <div>用户管理</div>
      <div>{{'总条数：'+userAbout.totalcount}}</div>
    </div>
    <div class="flex" style="width: 95%;">

   <div  style="width: 100%">
    <div class="color friend" >用户信息列表</div>
    <el-table :data="userAbout.tableData" class="eltable" style="width: 100%;height: calc(100vh - 220px);">
      <el-table-column fixed prop="id" label="ID" width="40" />
      <el-table-column prop="username" label="用户名" width="100" />
      <el-table-column prop="nickname" label="昵称" width="100" />
      <el-table-column prop="email" label="邮箱" min-width="200" />
      <el-table-column prop="role.name" label="权限" min-width="70" />
      <el-table-column prop="createTime" label="注册时间" min-width="220" />
      <el-table-column prop="createTime" label="操作" min-width="70" >
        <template #default="scope">
          <el-button link type="primary" size="small"  @click="addFriend(scope.row.id)">添加好友</el-button>
        </template>
      </el-table-column>
    </el-table>
   </div>
    <div class="border" style="width: 25%" >
      <div class="color friend" >我的管理列表</div>
      <el-table :data="friendAbout.tableData" class="eltable" style="width: 100%;height: calc(100vh - 220px);">
      <el-table-column fixed prop="friend_id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="100" />
      <el-table-column label="操作" wwidth="80" >
        <template #default="scope">
          <el-button link type="primary" size="small"  @click="delFriend(scope.row.friend_id)">删除好友</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
   
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import {AddFriend, DelFriend, GetFriend, GetList} from '@/apis/userApis';

  const friendAbout = reactive({
    totalcount:0,
    tableData:[]
  })
  const getFriend = async()=>{
    const {data, totalcount} = await GetFriend()
    friendAbout.totalcount = totalcount
    friendAbout.tableData = data.reduce((pre:any,item:any)=>{
     
      const user:any = userAbout.tableData.filter((i:{
        id:number
        username:string
      })=>{
        return i.id == item.friend_id
      })
      return [...pre,{friend_id:item.friend_id,username:user[0]['username']}]
    },[])
  }
  const addFriend = async(id:number)=>{
    const res = await AddFriend(id)
    getList()
    getFriend()
  }
  const delFriend = async(friend_id:number)=>{
    const res = await DelFriend(friend_id)
    getList()
    getFriend()
  }

  const userAbout = reactive({
    totalcount:0,
    tableData:[]
  })
  const getList = async()=>{
    const {users, totalCount} = await GetList()
    userAbout.totalcount = totalCount
    userAbout.tableData = users
    getFriend()
  }
  onMounted(()=>{
    getList()
  })
  </script>
  
  <style lang="scss" scoped>
  .box {
  .search {
    height: 100px;
    padding: 0 6%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(236, 236, 236);
    .input {
      width: 300px;
    }
  }
  .friend{
    height: 80px;
    padding: 0 30px;
    font-size: 20px;
    opacity: .6;
  }
  .eltable {
    margin: 0 auto;
    
  }
  .border{
    border-left: 5px solid #f3f3f3;
  }
}
.modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: #ececedbd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .change{
    width: 400px;
    height: 450px;
    padding: 20px;
    margin: 20px 0;
    color: var(--color-text-primary);
    background-color: #fff;
    .input{
        height: 50px;
        margin: 10px 0;
    }
  }
}
</style>  