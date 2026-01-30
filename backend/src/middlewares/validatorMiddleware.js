import { z } from "zod";

const validateSchema = (schema) => async (req, res, next) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron datos para validar" });
    }
    // Guardamos en una variable el resultado de la validación
    const result = await schema.parseAsync(req.body);
    // Si la validación es exitosa, pasamos al siguiente middleware
    req.body = result;
    next();
  } catch (error) {
    // Validamos que el error sea de Zod
    if (error instanceof z.ZodError) {
      // Extraemos los detalles del error
      error.issues;
      return res.status(400).json({
        message: "Verifique los datos proporcionados",
        errors: error.issues,
      });
    }
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export { validateSchema };
