<template>
  <div>
    <a-card :bordered="false">
      <template #title>
        <a-space>
          <span>审核中心</span>
          <a-tag color="orange">待处理 {{ total }}</a-tag>
        </a-space>
      </template>
      <a-form layout="inline" :model="query" style="margin-bottom: 16px">
        <a-form-item label="审核状态">
          <a-select v-model:value="query.status" style="width: 150px" allow-clear>
            <a-select-option value="待审核">待审核</a-select-option>
            <a-select-option value="已通过">已通过</a-select-option>
            <a-select-option value="已拒绝">已拒绝</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSearch">查询</a-button>
        </a-form-item>
      </a-form>
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="statusColor(record.status)">{{ record.status }}</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="onApprove(record)">通过</a-button>
              <a-button type="link" size="small" danger @click="onReject(record)">拒绝</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

const query = reactive({ status: '待审核' })
const total = ref(89)
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '内容标题', dataIndex: 'title', key: 'title' },
  { title: '创作者', dataIndex: 'creator', key: 'creator' },
  { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime' },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150 }
]
const data = ref([
  { id: 1, title: '示例视频 A', creator: 'creator_01', submitTime: '2026-10-11 10:23', status: '待审核' },
  { id: 2, title: '示例视频 B', creator: 'creator_02', submitTime: '2026-10-11 09:15', status: '待审核' }
])
const pagination = { current: 1, pageSize: 10, total: 89 }

function statusColor(s: string) {
  return { '待审核': 'orange', '已通过': 'green', '已拒绝': 'red' }[s] || 'default'
}
function onSearch() { message.info(`查询: ${query.status}`) }
function onApprove(r: any) { message.success(`已通过 ${r.title}`) }
function onReject(r: any) { message.warning(`已拒绝 ${r.title}`) }
</script>
