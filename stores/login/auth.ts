import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useToken } from '@/utils/token';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = useToken();
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await useFetch('/api/login', {
        method: 'POST',
        body: { username, password },
      });
      if (error.value || !data.value?.token) return false;

      token.set(data.value.token);
      user.value = data.value.user;
      router.push('/dashboard');
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    token.clear();
    user.value = null;
    router.push('/login');
  };

  const isLoggedIn = computed(() => !!token.get());

  return { user, login, logout, isLoggedIn };
});
