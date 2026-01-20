import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

// Función para verificar si un usuario existe por su ID
const existUser = async (id) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
  });
  return user !== null;
};

const getUserByEmail = async (correo) => {
  const user = await prisma.usuario.findUnique({
    where: {
      email: correo,
    },
  });
  return user;
};

// Función para verificar la contraseña de un usuario dado su email
const verifyPassword = async (email, password) => {
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // 🔥 DEVUELVES DATOS REALES
  return {
    id: user.id,
    email: user.email,
  };
};

export { verifyPassword, existUser, getUserByEmail };
