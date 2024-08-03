import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/public/login.vue')
  },
  {
    path: '/',
    redirect: '/manage'
  },
  {
    path: '/manage',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/home/index.vue'),
    children:[{
      path:'',
      redirect:'/manage/goods'
    },{
      path:'/manage/goods',
      name:'Goods',
      component:()=> import('@/pages/home/goodsCenter.vue')
    },{
      path:'/manage/change',
      name:'Change',
      component:()=> import('@/pages/home/changeGoods.vue')
    },{
      path:'/manage/recard',
      name:'Recard',
      component:()=> import('@/pages/home/recardCenter.vue')
    },{
      path:'/manage/user',
      name:'User',
      component:()=> import('@/pages/home/userCenter.vue')
    }],
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        to.path === '/login' ? next() : router.push('/login')
      } else {
        next()
      }
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound'
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('@/pages/public/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
