import { z } from "zod";
import { getUserByEmail } from "../services/userService.js";
import { existCountry } from "../services/paisService.js";
import { existSegment } from "../services/segmentoService.js";
import { Rol } from "@prisma/client";

const createUserSchema = z
  .object({
    email: z
      .string("El correo electrónico es obligatorio")
      .email("El correo electrónico no es válido"),
    password: z
      .string("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña debe tener como máximo 20 caracteres"),
    /*.regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un carácter especial")*/
    confirmPassword: z.string(
      "La confirmacion de la contraseña es obligatoria",
    ),
    rol: z.nativeEnum(Rol).optional(),
      // .string()
      // .optional()
      // .refine((val) => val === "USER" || val === "ADMIN"),
    perfil: z.object({
      nombre: z.string("El nombre es obligatorio"),
      apellido: z.string().optional(),
      edad: z.number().min(0, "La edad no puede ser negativa").optional(),
      telefono: z.string().optional(),
      paisId: z.coerce
        .number("el Pais es obligatorio")
        .int("el Pais no tiene un formato válido"),
      segmentoId: z.coerce
        .number("el Segmento es obligatorio")
        .int("el Segmento no tiene un formato válido"),
    }),
  })
  .superRefine(async (data, ctx) => {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "El correo electronico ya esta registrado",
      });
    }

    if (data.password != data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
      });
    }

    const countryExists = await existCountry(data.perfil.paisId);
    if (!countryExists) {
      ctx.addIssue({
        code: "custom",
        message: "El país proporcionado no existe",
        path: ["perfil", "paisId"],
      });
    }

    const segmentExists = await existSegment(data.perfil.segmentoId);
    if (!segmentExists) {
      ctx.addIssue({
        code: "custom",
        message: "El segmento proporcionado no existe",
        path: ["perfil", "segmentoId"],
      });
    }
  });

export { createUserSchema };
