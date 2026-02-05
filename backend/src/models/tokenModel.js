import prisma from "../config/prismaConfig.js";

// Verificar que el token existe y es válido
const isTokenActive = async (token) => {
  const tokenRecord = await prisma.token.findUnique({
    where: {
      token: token,
    },
  });
  return tokenRecord !== null;
};

// Guardar un nuevo token en la base de datos
const saveToken = async (userId, token) => {
  const userIdParsed = parseInt(userId, 10);
  const result = await prisma.token.create({
    data: {
      usuarioId: userIdParsed,
      token: token,
    },
  });
  return result;
};

// Eliminar un token de la base de datos
const deleteToken = async (token) => {
  const result = await prisma.token.delete({
    where: {
      token: token,
    },
  });
  return result;
};

export { isTokenActive, saveToken, deleteToken };
