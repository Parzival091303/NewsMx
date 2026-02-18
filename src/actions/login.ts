import { prisma } from "@/db";
import { defineAction } from "astro:actions";


import { z } from "astro:schema";

export const login = defineAction({
     
  input: z.object({
    email: z.string(),
    password: z.string(),
  }),

  handler: async ({ email, password }, { cookies }) => {
    const user = await prisma.usuarios.findFirst({
      where: {
        correo: email,
        contraseña: password, // texto plano como lo tienes
      },
    });

    if (!user) {
      throw new Error("Correo o contraseña incorrectos");
    }

    cookies.set(
      "user",
      JSON.stringify({
        id: user.id_usuario,
        nombre: user.nombre,
        rol: user.id_rol,
      }),
      {
        httpOnly: true,
        path: "/administrador",
        sameSite: "lax",
        secure: false, // en localhost
      }
    );

    return { success: true };
  },
});
