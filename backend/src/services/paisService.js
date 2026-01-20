import prisma from "../config/prismaConfig.js";

const existCountry = async (id) => {
  const country = await prisma.pais.findUnique({
    where: {
      id: id,
    },
  });
  return country !== null;
};

export { existCountry };
