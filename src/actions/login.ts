import { prisma } from "@/db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string(),
    password: z.string(),
  }),

  handler: async ({ email, password }, { cookies }) => {
    console.log("Buscando usuario:", email);

    try {
      const user = await prisma.usuarios.findFirst({
        where: {
          correo: email,
        },
      });

      console.log("Usuario encontrado:", user);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (user.contraseña !== password) {
        throw new Error("Contraseña incorrecta");
      }

      cookies.set("user", JSON.stringify({
        id: user.id_usuario.toString(),  // 👈 fix BigInt
        nombre: user.nombre,
        rol: user.id_rol.toString(),     // 👈 fix BigInt
      }), {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
      });

      return { success: true };

    } catch (e) {
      console.error("Error en login:", e);
      throw e;
    }
  },
});