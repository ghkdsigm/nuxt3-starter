<template>
  <div class="p-6">
    <CommonBaseTable :columns="columns" :items="users" :loading="loading">
      <template #cell-actions="{ item }">
        <button class="text-blue-500 hover:underline" @click="edit(item)">수정</button>
        <button class="ml-2 text-red-500 hover:underline" @click="remove(item)">삭제</button>
      </template>
    </CommonBaseTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loading = ref(true);
const users = ref([]);

const columns = [
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'role', label: '역할' },
  { key: 'actions', label: '관리', class: 'text-right' },
];

const fetchUsers = async () => {
  loading.value = true;
  // 예시용 timeout
  await new Promise((resolve) => setTimeout(resolve, 1000));
  users.value = [
    { name: '홍길동', email: 'hong@example.com', role: '관리자' },
    { name: '김영희', email: 'kim@example.com', role: '사용자' },
  ];
  loading.value = false;
};

onMounted(fetchUsers);

const edit = (item: any) => {
  alert(`수정: ${item.name}`);
};

const remove = (item: any) => {
  alert(`삭제: ${item.name}`);
};
</script>
