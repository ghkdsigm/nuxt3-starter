<template>
  <div class="relative">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
      <span class="text-gray-600">Loading...</span>
    </div>

    <!-- 테이블 -->
    <table class="min-w-full table-auto border border-gray-200 text-sm">
      <thead class="bg-gray-100 font-medium text-gray-700">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="border-b border-gray-200 px-4 py-2 text-left"
            :class="col.class"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터 없는 경우 -->
        <tr v-if="!loading && items.length === 0">
          <td :colspan="columns.length" class="py-6 text-center text-gray-400">데이터가 없습니다.</td>
        </tr>

        <!-- 데이터 있는 경우 -->
        <tr v-for="(item, rowIndex) in items" :key="rowIndex" class="hover:bg-gray-50">
          <td
            v-for="(col, colIndex) in columns"
            :key="colIndex"
            class="border-t border-gray-200 px-4 py-2"
            :class="col.class"
          >
            <!-- 기본 렌더링 또는 슬롯 -->
            <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]" :row-index="rowIndex">
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Column {
  key: string;
  label: string;
  class?: string;
}

defineProps<{
  columns: Column[];
  items: any[];
  loading?: boolean;
}>();
</script>
<style lang="scss" scoped></style>
