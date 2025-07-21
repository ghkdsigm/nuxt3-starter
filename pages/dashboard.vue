<template>
  <div class="flex min-h-screen items-center justify-center">
    <h1 class="text-2xl">Dashboard에 오신 것을 환영합니다 🎉</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>
