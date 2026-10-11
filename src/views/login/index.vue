<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">榴莲TV 管理后台</h1>
      <p class="subtitle">Star AI Admin</p>
      <a-form :model="form" :rules="rules" ref="formRef" layout="vertical" @finish="onSubmit">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="form.username" placeholder="请输入用户名" size="large">
            <template #prefix><user-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" size="large">
            <template #prefix><lock-outlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

async function onSubmit() {
  try {
    loading.value = true
    await formRef.value.validate()
    const res = await userStore.login(form.username, form.password)
    if (res.success) {
      message.success('登录成功')
      const redirect = (route.query.redirect as string) || '/dashboard'
      router.push(redirect)
    }
  } catch {}
  finally { loading.value = false }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 400px; padding: 40px; background: #fff; border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.title { text-align: center; margin: 0 0 4px; font-size: 24px; }
.subtitle { text-align: center; margin: 0 0 32px; color: #999; font-size: 14px; }
</style>
