import { z } from "zod";
import { getUserByEmail, verifyPassword } from "../services/userService.js";

const loginSchema = z
  .object({
    email: z
      .string("El correo electrónico es obligatorio")
      .email({ message: "Correo electrónico inválido" }),
    password: z.string("La contraseña es obligatoria"),
  })
  .superRefine(async (data, ctx) => {
    const user = await getUserByEmail(data.email);
    if (!user) {
      ctx.addIssue({
        code: "custom",
        path: ["email", "password"],
        message: "Correo electrónico o contraseña incorrectos",
      });
      return;
    }

    const validPassword = await verifyPassword(data.email, data.password);
    console.log(validPassword);
    if (!validPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["email", "password"],
        message: "Correo electrónico o contraseña incorrectos",
      });
    }
  });

export { loginSchema };
