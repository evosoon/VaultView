import { ElNotification } from "element-plus"
import { h } from "vue"
import 'element-plus/theme-chalk/el-notification.css';
export const useNotification = (title: string = '提示', message: string) => {
    ElNotification({
      title,
      message: h('i', { style: 'color:var(--color-text-primary)' }, message),
      position: 'top-right',
      duration: 3000,
    })
  }
