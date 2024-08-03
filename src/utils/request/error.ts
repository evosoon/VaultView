import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const $router = useRouter()

function showErrorInfo(status: any): void {
  switch (status.result_code) {
    case 'success': {
      break
    }
    case 'invalid_param': {
      ElMessage.error(status.message)
      break
    }
    case 401: {
      ElMessage.error('身份认证失败（401）')
      localStorage.clear()
      $router.replace('/login')
      break
    }

    case 404: {
      ElMessage({
        showClose: true,
        message: '请求地址不存在（404）',
        center: true,
        type: 'error'
      })
      setTimeout(() => {
        $router.replace('/notFound')
      }, 1000)
      break
    }

    case '500': {
      ElMessage({
        showClose: true,
        message: '服务器发生了未知错误（500）',
        center: true,
        type: 'error'
      })
      break
    }

    // default: {
    //   ElMessage.error('请求失败, 请稍后重试.')
    // }
  }
}

export default showErrorInfo
