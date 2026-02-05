import prisma from "../config/prismaConfig.js";

const existSegment = async (id) => {
  const segment = await prisma.segmento.findUnique({
    where: {
      id: id,
    },
  });
  return segment !== null;
};

export { existSegment };
