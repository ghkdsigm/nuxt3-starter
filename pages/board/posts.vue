<template>
  <div class="mx-auto max-w-2xl py-10">
    <h1 class="mb-4 text-2xl font-bold">게시판</h1>

    <form class="mb-8 space-y-4" @submit.prevent="submitPost">
      <input v-model="title" placeholder="제목" class="w-full rounded border p-2" />
      <textarea v-model="content" placeholder="내용" class="h-32 w-full rounded border p-2"></textarea>
      <button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">게시하기</button>
    </form>

    <div v-for="post in posts" :key="post.id" class="mb-6 rounded border p-4">
      <h2 class="text-lg font-semibold">{{ post.title }}</h2>
      <p class="text-gray-700">{{ post.content }}</p>
      <p class="text-sm text-gray-500">by {{ post.author?.name || '알 수 없음' }} / {{ formatDate(post.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const title = ref('');
const content = ref('');
interface Post {
  id: number;
  title: string;
  content: string;
  author?: {
    name?: string;
  };
  createdAt: string;
}

const posts = ref<Post[]>([]);

const submitPost = async () => {
  await $fetch('/api/posts', {
    method: 'POST',
    body: {
      title: title.value,
      content: content.value,
      authorId: 1, // 로그인 안 되어있다면 mock 데이터
    },
  });
  title.value = '';
  content.value = '';
  loadPosts();
};

const loadPosts = async () => {
  posts.value = await $fetch<Post[]>('/api/posts');
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString();
};

onMounted(loadPosts);
</script>
