<template>
  <div>
    <a-card :bordered="false" title="用户管理">
      <a-table :columns="columns" :data-source="data" :pagination="pagination" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'vip'">
            <a-tag v-if="record.vip" color="gold">VIP</a-tag>
            <span v-else style="color: #bbb">普通</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">详情</a-button>
              <a-button type="link" size="small" danger>封禁</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: 'Region', dataIndex: 'region', key: 'region' },
  { title: '会员状态', key: 'vip', width: 100 },
  { title: '注册时间', dataIndex: 'regTime', key: 'regTime' },
  { title: '操作', key: 'action', width: 150 }
]
const data = [
  { id: 1, username: 'user_01', email: 'a@b.com', region: 'cn', vip: true, regTime: '2026-09-01' },
  { id: 2, username: 'user_02', email: 'c@d.com', region: 'sg', vip: false, regTime: '2026-09-15' }
]
const pagination = { current: 1, pageSize: 10, total: 998 }
</script>
