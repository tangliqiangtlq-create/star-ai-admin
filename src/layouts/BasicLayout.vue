<template>
  <a-layout class="basic-layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null" width="220">
      <div class="logo">
        <span v-if="!collapsed">榴莲TV Admin</span>
        <span v-else>🥝</span>
      </div>
      <a-menu theme="dark" mode="inline" :selected-keys="selectedKeys" @click="onMenuClick">
        <a-menu-item v-for="item in menuItems" :key="item.path">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <menu-fold-outlined class="trigger" @click="collapsed = !collapsed" />
        <div class="spacer" />
        <a-dropdown>
          <div class="user-info">
            <a-avatar :size="32" style="background-color: #1890ff">A</a-avatar>
            <span class="username">Admin</span>
          </div>
          <template #overlay>
            <a-menu @click="onUserMenuClick">
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  AuditOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const collapsed = ref(false)

const menuItems = [
  { path: '/dashboard', title: '数据看板', icon: () => h(DashboardOutlined) },
  { path: '/review', title: '审核中心', icon: () => h(AuditOutlined) },
  { path: '/order', title: '订单管理', icon: () => h(ShoppingCartOutlined) },
  { path: '/user', title: '用户管理', icon: () => h(UserOutlined) }
]

const selectedKeys = computed(() => [route.path])

function onMenuClick({ key }: { key: string }) {
  router.push(key)
}

function onUserMenuClick({ key }: { key: string }) {
  if (key === 'logout') {
    userStore.logout().then(() => router.push('/login'))
  }
}
</script>

<style lang="less" scoped>
.basic-layout { height: 100vh; }
.logo {
  height: 64px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: bold; font-size: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.header {
  background: #fff; padding: 0 16px; display: flex; align-items: center;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
}
.trigger { font-size: 18px; cursor: pointer; }
.spacer { flex: 1; }
.user-info { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.username { color: #333; }
.content { margin: 16px; background: #fff; padding: 24px; min-height: calc(100vh - 112px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
