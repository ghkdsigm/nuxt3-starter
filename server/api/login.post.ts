export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (username === 'admin' && password === '1234') {
    return {
      token: 'mock-jwt-token-123456',
      user: {
        id: 1,
        name: '관리자',
        username: 'admin',
      },
    };
  }

  return sendError(event, createError({ statusCode: 401, message: 'Unauthorized' }));
});
