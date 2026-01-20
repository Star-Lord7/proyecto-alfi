import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        // password: true,
        rol: true,
        estado: true,
        perfiles: {
          select: {
            nombre: true,
            apellido: true,
            edad: true,
            telefono: true,
            pais: {
              select: {
                nombre: true,
              },
            },
            segmento: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    return users;
  } catch (error) {
    throw new Error("Error en userModel: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const idParsed = parseInt(id, 10);
    const user = await prisma.usuario.findUnique({
      where: { id: idParsed },
      select: {
        id: true,
        email: true,
        // password: true,
        perfiles: {
          select: {
            nombre: true,
            apellido: true,
            edad: true,
            telefono: true,
            pais: {
              select: {
                nombre: true,
              },
            },
            segmento: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error en userModel: " + error.message);
  }
};

const createUser = async (email, password, rol, perfil) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        rol,
        perfiles: {
          create: {
            nombre: perfil.nombre,
            apellido: perfil.apellido,
            edad: perfil.edad,
            telefono: perfil.telefono,
            paisId: perfil.paisId,
            segmentoId: perfil.segmentoId,
          },
        },
      },
      select: {
        id: true,
        email: true,
        // password: true,
        rol: true,
        estado: true,

        perfiles: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            edad: true,
            telefono: true,

            pais: {
              select: {
                // id: true,
                nombre: true,
              },
            },

            segmento: {
              select: {
                // id: true,
                nombre: true,
              },
            },
          },
        },
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("Error en userModel: " + error.message);
  }
};

const updateUser = async (id, email, password, rol, estado, perfil) => {
  try {
    const idParsed = parseInt(id, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.usuario.update({
      where: { id: idParsed },
      data: {
        email: email,
        password: hashedPassword,
        rol: rol,
        estado: estado,
        perfiles: {
          updateMany: {
            where: { usuarioId: idParsed },
            data: {
              nombre: perfil.nombre,
              apellido: perfil.apellido,
              edad: perfil.edad,
              telefono: perfil.telefono,
              paisId: perfil.paisId,
              segmentoId: perfil.segmentoId,
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        // password: true,
        perfiles: {
          select: {
            nombre: true,
            apellido: true,
            edad: true,
            telefono: true,
            pais: {
              select: {
                nombre: true,
              },
            },
            segmento: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error en userModel: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const idParsed = parseInt(id, 10);
    const deletedUser = await prisma.usuario.update({
      where: { id: idParsed },
      data: { estado: false, deleted_at: new Date() },
    });
    return deletedUser;
  } catch (error) {
    throw new Error("Error en userModel: " + error.message);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
