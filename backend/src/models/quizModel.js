import prisma from "../config/prismaConfig.js";
import { existPuntajeUsuario } from "../services/userService.js";

const getUserQuizProfile = async (usuarioId, puntajeUsuarioId) => {
  try {
    const usuarioIdParse = parseInt(usuarioId, 10);
    const puntajeUsuarioIdParse = parseInt(puntajeUsuarioId, 10);

    const existUsuario = await existPuntajeUsuario(usuarioIdParse);
    if (!existUsuario) {
      throw new Error(`Puntaje de usuario con ID ${usuarioId} no existe.`);
    }

    const quizProfile = await prisma.puntajeUsuario.findFirst({
      where: {
        id: puntajeUsuarioIdParse,
      },
      select: {
        perfilId: usuarioIdParse,
        coleccionId: true,
        puntajeFinal: true,
      },
    });

    return quizProfile;
  } catch (error) {
    throw new Error(
      "Error al obtener el perfil de quiz del usuario: " + error.message,
    );
  }
};

const startQuizSession = async (perfilId, coleccionId) => {
  try {
    const parseId = parseInt(perfilId, 10);
    const parsedColeccionId = parseInt(coleccionId, 10);
    const startQuiz = await prisma.puntajeUsuario.create({
      data: {
        perfilId: parseId,
        coleccionId: parsedColeccionId,
        puntajeFinal: 0,
      },
      select: {
        id: true,
      },
    });
    return startQuiz;
  } catch (error) {
    throw new Error("Error al iniciar la sesión de quiz: " + error.message);
  }
};

const evaluarRespuesta = async (
  tarjetaId,
  opcionId,
  puntajeUsuarioId,
  tiempoRespuesta,
) => {
  try {
    const tarjetaIdParse = parseInt(tarjetaId, 10);
    const opcionIdParse = parseInt(opcionId, 10);
    const puntajeUsuarioIdParse = parseInt(puntajeUsuarioId, 10);

    //Hacer consulta para ver si el campo es_correcta de la opcionId es true o false
    const opcion = await prisma.opcionRespuesta.findUnique({
      where: {
        id: opcionIdParse,
      },
      select: {
        feedback: true,
        es_correcta: true,
      },
    });

    //Devolver un feedback dependiendo si es correcta o no
    if (!opcion.es_correcta) {
      return {
        message: "Respuesta incorrecta",
        feedback: opcion.feedback ?? "Sin feedback disponible",
      };
    }

    const respueta = await prisma.respuestaUsuario.create({
      data: {
        tarjetaId: tarjetaIdParse,
        opcionId: opcionIdParse,
        puntajeId: puntajeUsuarioIdParse,
        tiempoRespuesta: tiempoRespuesta,
        esCorrecta: opcion.es_correcta,
      },
    });

    if (respueta.esCorrecta) {
      await prisma.puntajeUsuario.update({
        where: {
          id: puntajeUsuarioIdParse,
        },
        data: {
          puntajeFinal: {
            increment: 10,
          },
        },
      });
    }

    return {
      feedback: opcion.feedback ?? "Sin feedback disponible",
      result: respueta,
    };
  } catch (error) {
    throw new Error("Error al evaluar la respuesta: " + error.message);
  }
};

export { getUserQuizProfile, evaluarRespuesta, startQuizSession };
