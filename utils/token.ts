type TokenType = 'accessToken' | 'refreshToken';

export const useToken = () => {
  const get = (type: TokenType) => (process.client ? localStorage.getItem(type) : null);
  const set = (type: TokenType, value: string) => localStorage.setItem(type, value);
  const clear = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  return { get, set, clear };
};
