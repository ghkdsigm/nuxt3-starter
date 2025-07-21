<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <form class="w-96 rounded bg-white p-6 shadow" @submit.prevent="handleLogin">
      <h2 class="mb-6 text-2xl font-bold">로그인</h2>
      <input
        v-model="username"
        type="text"
        placeholder="아이디"
        class="mb-3 w-full rounded border px-3 py-2 text-gray-600"
      />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="mb-4 w-full rounded border px-3 py-2 text-gray-600"
      />
      <button type="submit" class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">로그인</button>
      <p v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/login/auth';

const username = ref('');
const password = ref('');
const error = ref('');

const auth = useAuthStore();

const handleLogin = async () => {
  error.value = '';
  const ok = await auth.login(username.value, password.value);
  if (!ok) error.value = '아이디 또는 비밀번호가 올바르지 않습니다.';
};
</script>
