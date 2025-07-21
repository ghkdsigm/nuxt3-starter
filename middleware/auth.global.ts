// middleware/auth.global.ts
import { useAuthStore } from '@/stores/login/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // 로그인 페이지 제외하고 인증 필요
  if (to.path !== '/login') {
    const ok = await auth.checkToken();
    if (!ok) return navigateTo('/login');
  }
});
