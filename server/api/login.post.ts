import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || user.password !== password) {
    return sendError(event, createError({ statusCode: 401, message: 'Unauthorized' }));
  }

  return {
    token: 'mock-jwt-token',
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  };
});
