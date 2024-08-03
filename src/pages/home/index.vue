<template>
  <div class="box">
    <el-container class="layout-container">
      <el-aside width="200px">
        <div class="logo flex">Vault</div>
        <el-scrollbar>
          <el-menu>
            <el-menu-item-group>
                <el-menu-item class="color" index="1-1" @click="routerJump('goods')">库存中心</el-menu-item>
                <el-menu-item class="color" index="1-2" @click="routerJump('change')">新增管理</el-menu-item>
                <el-menu-item class="color" index="1-3" @click="routerJump('recard')">操作记录</el-menu-item>
                <el-menu-item class="color" index="1-4" @click="routerJump('user')">用户管理</el-menu-item>
                  <div style="height: '20px';"></div>
                <el-menu-item class="color" index="1-5" @click="routerJump('login')">退出账户</el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <div class="center">
        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const routerJump = (path:string)=>{
    if(path=='login'){
        localStorage.removeItem('access_token')
        router.push('/login')
    }else{
        router.push(path)
    }
}

</script>

<style lang="scss" scoped>
.box {
  padding: 0 20px;
  height: 100vh;
  overflow: hidden;
  .logo {
    font-size: 26px;
    height: 150px;
    justify-content: center;
    margin-right: 20px;
    border-bottom: 1px solid #8530ca;
    align-items: center;
    font-weight: 700;
    background: linear-gradient(0.25turn, #5179e7, #8c00ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}
.center{
    width: 100%;
    position: relative;
  }
  .center::before{
    content: "";
    position: absolute;
    width: 5px;
    background-color: rgb(219, 218, 232);
    top: 0;
    bottom: 0;
  }
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  height: 100vh;
  overflow: hidden;
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-menu-item-group{
    overflow: auto;
    height: calc(100vh - 200px);
}
</style>
