import { defineStore } from 'pinia';
import { useToken } from '@/utils/token';
import { useApiDispatcher } from '@/composables/useApiDispatcher';

interface User {
  id: number;
  username: string;
  name: string;
  [key: string]: any;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = useToken();
  const router = useRouter();

  const isLoggedIn = computed(() => !!token.get('accessToken'));

  const login = async (username: string, password: string) => {
    try {
      const apiDispatcher = useApiDispatcher();
      const res = await apiDispatcher.dispatch({
        method: 'post',
        path: 'auth/login',
        params: { username, password },
      });

      if (!res?.token) return false;
      token.set('accessToken', res.token);
      user.value = res.user;
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    token.clear();
    user.value = null;
    router.push('/login');
  };

  const fetchUser = async () => {
    try {
      const apiDispatcher = useApiDispatcher();
      const res = await apiDispatcher.dispatch({
        method: 'get',
        path: 'auth/me',
      });
      user.value = res;
    } catch (e) {
      logout();
    }
  };

  const checkToken = async (): Promise<boolean> => {
    const access = token.get('accessToken');
    if (!access) return false;

    try {
      const apiDispatcher = useApiDispatcher();
      await apiDispatcher.dispatch({ method: 'get', path: 'auth/check-token' });
      return true;
    } catch (e) {
      logout();
      return false;
    }
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    fetchUser,
    checkToken,
  };
});
