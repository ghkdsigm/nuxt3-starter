export default defineNuxtRouteMiddleware((to) => {
  const token = useToken().get();
  if (to.path !== '/login' && !token) {
    return navigateTo('/login');
  }
});
