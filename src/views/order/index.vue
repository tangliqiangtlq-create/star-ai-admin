<template>
  <div>
    <a-card :bordered="false" title="订单管理">
      <a-form layout="inline" :model="query" style="margin-bottom: 16px">
        <a-form-item label="订单号">
          <a-input v-model:value="query.orderNo" placeholder="请输入订单号" allow-clear />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="query.status" style="width: 150px" allow-clear>
            <a-select-option value="PAID">已支付</a-select-option>
            <a-select-option value="PENDING">待支付</a-select-option>
            <a-select-option value="REFUNDED">已退款</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">导出</a-button>
        </a-form-item>
      </a-form>
      <a-table :columns="columns" :data-source="data" :pagination="pagination" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="orderStatusColor(record.status)">{{ record.status }}</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const query = reactive({ orderNo: '', status: undefined })
const columns = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
  { title: '用户', dataIndex: 'user', key: 'user' },
  { title: '商品', dataIndex: 'product', key: 'product' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '支付方式', dataIndex: 'payMethod', key: 'payMethod' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '时间', dataIndex: 'time', key: 'time' }
]
const data = ref([
  { orderNo: 'ORD20261011001', user: 'user_01', product: '月度会员', amount: '$9.99', payMethod: 'Stripe', status: 'PAID', time: '2026-10-11 10:30' },
  { orderNo: 'ORD20261011002', user: 'user_02', product: '单集解锁', amount: '$1.99', payMethod: '微信', status: 'PENDING', time: '2026-10-11 10:28' }
])
const pagination = { current: 1, pageSize: 10, total: 1523 }

function orderStatusColor(s: string) {
  return { PAID: 'green', PENDING: 'orange', REFUNDED: 'red' }[s] || 'default'
}
</script>
