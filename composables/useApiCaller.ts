import { useToken } from '@/utils/token';
import { useApiStore } from '@/stores/common/api';

export interface ApiCallerParams {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: any;
  query?: Record<string, any> | string;
  configType?: 'json' | 'form' | 'form_multi';
  base?: 'main' | 'sub' | 'megam';
}

export const useApiCaller = async (params: ApiCallerParams) => {
  console.log(
    'ApiCallerParams',
    params.method,
    params.path,
    params.params,
    params.query,
    params.configType,
    params.base,
  );
  const store = useApiStore();
  const config = useRuntimeConfig();
  const token = useToken();

  // const baseURL =
  //   params.base === 'sub'
  //     ? config.public.apiSub
  //     : params.base === 'megam'
  //     ? config.public.apiMegam
  //     : config.public.apiMain;
  const baseURL = config.public.apiBase;

  const url = typeof params.query === 'string' ? `${params.path}?${params.query}` : params.path;

  const headers: HeadersInit = {
    Accept: 'application/json',
    Authorization: token.get('accessToken') ? `Bearer ${token.get('accessToken')}` : '',
  };

  let body = params.params;
  if (params.configType === 'form') {
    const formData = new FormData();
    for (const key in params.params) formData.append(key, params.params[key]);
    body = formData;
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  store.loading = true;
  store.error = null;
  try {
    const result = await $fetch(`${baseURL}/${url}`, {
      method: params.method,
      body: params.method !== 'GET' ? body : undefined,
      query: typeof params.query === 'object' ? params.query : undefined,
      headers,
    });
    store.lastResult = result;
    return result;
  } catch (err: any) {
    store.error = err?.data?.errorMessage || '알 수 없는 에러';
    throw err;
  } finally {
    store.loading = false;
  }
};
