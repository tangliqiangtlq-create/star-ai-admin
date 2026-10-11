import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>(localStorage.getItem('X-Access-Token') || '')
    const username = ref('')
    const avatar = ref('')

    async function login(username: string, password: string) {
      const res = await request.post('/jeecg-boot/sys/login', { username, password, captcha: 'check' })
      if (res.success) {
        token.value = res.result?.token || ''
        localStorage.setItem('X-Access-Token', token.value)
      }
      return res
    }

    async function logout() {
      try { await request.post('/jeecg-boot/sys/logout') } catch {}
      token.value = ''
      username.value = ''
      avatar.value = ''
      localStorage.removeItem('X-Access-Token')
    }

    return { token, username, avatar, login, logout }
  },
  { persist: true }
)
