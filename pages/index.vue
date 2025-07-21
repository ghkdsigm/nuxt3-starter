<template>
  <div class="py-20 text-center">
    <h1 class="mb-4 text-4xl font-bold">🟢 Nuxt 3 정상 실행 중</h1>
    <NuxtLink to="/login" class="text-blue-500 underline">로그인 페이지로 이동</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: () => navigateTo('/login'),
});
</script>
