<template>
  <form class="w-96 rounded bg-white p-8 text-gray-700 shadow-md" @submit.prevent="login">
    <h1 class="mb-6 text-2xl font-bold">로그인</h1>
    <div class="mb-4">
      <label for="username" class="mb-1 block text-sm font-medium">아이디</label>
      <input id="username" v-model="username" type="text" class="w-full rounded border px-3 py-2" required />
    </div>
    <div class="mb-6">
      <label for="password" class="mb-1 block text-sm font-medium">비밀번호</label>
      <input id="password" v-model="password" type="password" class="w-full rounded border px-3 py-2" required />
    </div>
    <button type="submit" class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">로그인</button>
    <p v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/login/auth';

const username = ref('');
const password = ref('');
const error = ref('');

const auth = useAuthStore();

const login = async () => {
  error.value = '';
  const success = await auth.login(username.value, password.value);
  if (!success) error.value = '아이디 또는 비밀번호가 잘못되었습니다.';
};
</script>
