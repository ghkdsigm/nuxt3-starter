import { useApiCaller, type ApiCallerParams } from '@/composables/useApiCaller';
import { useAuthStore } from '@/stores/login/auth';

export const useApiDispatcher = () => {
  const auth = useAuthStore();

  const dispatch = async (payload: {
    method: string;
    path: string;
    params?: any;
    query?: any;
    configType?: 'json' | 'form' | 'form_multi';
    base?: 'main' | 'sub' | 'megam';
  }) => {
    const nonAuthPaths = ['login', 'public-info'];

    if (!nonAuthPaths.some((k) => payload.path.includes(k))) {
      const valid = await auth.checkToken?.();
      if (!valid) {
        return navigateTo('/login');
      }
    }

    type CustomMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

    const key = payload.method.toLowerCase() as CustomMethod;

    const methodMap: Record<CustomMethod, ApiCallerParams['method']> = {
      get: 'GET',
      post: 'POST',
      put: 'PUT',
      patch: 'PATCH',
      delete: 'DELETE',
    };

    console.log('methodMap[key]', methodMap[key]);

    return useApiCaller({
      method: methodMap[key] || 'GET',
      path: payload.path,
      params: payload.params,
      query: payload.query,
      configType: payload.configType || 'json',
      base: payload.base || 'main',
    });
  };

  return { dispatch };
};
