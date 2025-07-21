import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastResult = ref<any>(null);
  return { loading, error, lastResult };
});
