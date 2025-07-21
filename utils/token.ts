export const useToken = () => {
  const key = 'auth_token';

  const get = () => (process.client ? localStorage.getItem(key) : null);
  const set = (token: string) => localStorage.setItem(key, token);
  const clear = () => localStorage.removeItem(key);

  return { get, set, clear };
};
