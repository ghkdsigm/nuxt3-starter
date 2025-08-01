<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <form class="w-96 rounded bg-white p-6 shadow" @submit.prevent="handleLogin">
      <h2 class="mb-6 text-2xl font-bold text-gray-600">{{ $t('login') }}</h2>
      <div class="mb-4 text-gray-600">
        <h1 class="text-2xl font-bold text-gray-800">{{ $t('welcome') }}</h1>
        <p class="text-lg text-gray-600">{{ $t('hello') }}</p>

        <div class="flex justify-center gap-4">
          <button :class="buttonClass(locale === 'en')" @click="changeLang('en')">English</button>
          <button :class="buttonClass(locale === 'ko')" @click="changeLang('ko')">한국어</button>
        </div>
      </div>
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
const { locale } = useI18n();
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

const changeLang = (lang: string) => {
  locale.value = lang;
};

const buttonClass = (active: boolean) => {
  return [
    'px-4 py-2 rounded-lg font-semibold transition-colors duration-200',
    active ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  ];
};
</script>
