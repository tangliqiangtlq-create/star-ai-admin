<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6" v-for="stat in stats" :key="stat.title">
        <a-card :bordered="false" class="stat-card">
          <div class="stat-title">{{ stat.title }}</div>
          <div class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</div>
          <div class="stat-desc">较昨日 {{ stat.delta }}</div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="12">
        <a-card title="近7天订单趋势" :bordered="false">
          <div class="chart-placeholder">📊 图表区域（待接入 ECharts）</div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="最新待审核" :bordered="false">
          <a-table :columns="reviewCols" :data-source="reviewData" :pagination="false" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="record.status === '待审核' ? 'orange' : 'green'">{{ record.status }}</a-tag>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { title: '今日新增用户', value: '1,234', delta: '+12.5%', color: '#1890ff' },
  { title: '今日订单数', value: '567', delta: '+8.2%', color: '#52c41a' },
  { title: '今日营收', value: '$12,345', delta: '+23.1%', color: '#fa8c16' },
  { title: '待审核内容', value: '89', delta: '-5', color: '#eb2f96' }
]
const reviewCols = [
  { title: '内容标题', dataIndex: 'title', key: 'title' },
  { title: '提交者', dataIndex: 'author', key: 'author' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '时间', dataIndex: 'time', key: 'time' }
]
const reviewData = [
  { title: '示例视频 #1', author: 'creator_01', status: '待审核', time: '10:23' },
  { title: '示例视频 #2', author: 'creator_02', status: '已通过', time: '09:15' },
  { title: '示例视频 #3', author: 'creator_03', status: '待审核', time: '08:47' }
]
</script>

<style lang="less" scoped>
.stat-card { border-radius: 8px; }
.stat-title { color: #999; font-size: 14px; }
.stat-value { font-size: 28px; font-weight: bold; margin: 8px 0; }
.stat-desc { color: #bbb; font-size: 12px; }
.chart-placeholder { height: 200px; display: flex; align-items: center; justify-content: center; color: #999; background: #fafafa; border-radius: 4px; }
</style>
