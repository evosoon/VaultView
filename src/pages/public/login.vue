<template>
  <div class="login">
    <div class="welcome">
        <img class="img" src="@/assets/message.png" alt="">
      <div>welcome to Vault</div>
    </div>
    <div class="form flex">
      <div class="title">
        <span class="show">{{ isLogin ? '登录' : '注册' }}</span>
        <span class="btn color" @click="isLogin = !isLogin">{{
          isLogin ? '注册' : '登录'
        }}</span>
      </div>
      <el-input
        class="input"
        v-model="userinfo.username"
        prefix-icon="User"
        placeholder="请输入用户名"
      />
      <el-input
        class="input"
        v-show="!isLogin"
        prefix-icon="Service"
        v-model="userinfo.nickname"
        placeholder="请输入昵称"
      />
      <el-input
        class="input"
        v-model="userinfo.password"
        type="password"
        prefix-icon="Lock"
        placeholder="请输入密码"
        show-password
      />
      <div class="flex email" v-show="!isLogin">
        <el-input
          class="email-input"
          prefix-icon="FolderOpened"
          style="width: 200px"
          v-model="userinfo.email"
          placeholder="请输入邮箱"
        />
        <el-button
          plain
          :disabled="captchaDisabled"
          @click="getCaptcha"
          >获取验证码</el-button
        >
      </div>
      <el-input
        class="input"
        prefix-icon="Postcard"
        v-show="!isLogin"
        v-model="userinfo.captcha"
        placeholder="请输入验证码"
      />
      <el-button style="border-color: #585ae2bd;color:#585ae2bd" plain class="submit" @click="submit">
        {{ isLogin ? '登录' : '注册' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router'

import { Login, Register } from '@/apis/userApis'
import { RegisterCaptcha } from '@/apis/emailApis'

const router = useRouter()

interface Userinfo {
  username: string
  password: string
  nickname: string
  email: string
  captcha: string | number
}

const userinfo = reactive<Userinfo>({
  username: '',
  password: '',
  nickname: '',
  email: '',
  captcha: ''
})

let isLogin = ref<boolean>(true)
let captchaDisabled = ref<boolean>(false)

const getCaptcha = () => {
  captchaDisabled.value = true
  RegisterCaptcha(userinfo.email)
  setTimeout(() => {
    captchaDisabled.value = false
  }, 10000)
}

const login = async () => {
  const res = await Login({
    username:userinfo.username,
    password:userinfo.password
  })
  console.log(res)
  localStorage.setItem('access_token',res.data.access_token)
  router.replace('/manage/')
}

const register = async () => {
  await Register(userinfo)
}

const submit = () => {
  isLogin.value ? login() : register()
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    120deg,
    var(--color-background-light) 30%,
    rgb(168, 176, 210) 60%,
    rgb(215, 221, 248) 9%
  );
  .welcome{
    position: absolute;
    flex-direction: column;
    left: 10%; 
    top: 180px;
    font-size: 28px;
    color: #5a2ae9;
    font-weight: bolder;
    opacity: .8;
      .img{
        width: 400px;
      }
      div{
        position: relative;
        padding-left: 60px;
        top: -90px;
        left: 70px;
        font-family: Arbitron;
      }
  }
  .form {
    position: absolute;
    flex-direction: column;
    right: 20%;
    top: calc(50% - 250px);
    height: 500px;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    opacity: 0.95;
    background-color: var(--color-background);
    box-shadow: 0 0 15px 4px #8a95b459;
    .title {
      margin: 10px;
      .show {
        font-size: 26px;
        color: var(--color-text-primary);
        padding-right: 15px;
        font-weight: 800;
      }
      .btn {
        font-weight: 800;
        cursor: pointer;
      }
    }
    .email {
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    ::v-deep(.el-input__wrapper) {
      box-shadow: none;
      border-bottom: 1px solid rgb(201, 201, 201);
      border-radius: 0;
    }
    .input {
      padding: 10px;
      margin: 0 auto;
      height: 60px;
    }
    .submit {
      margin-top: 40px;
      height: 45px;
    }
  }
}
</style>
