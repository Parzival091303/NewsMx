import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { addUser } from "@/data";
export const register = defineAction({
    accept: "json",
    input: z.object({
        id_rol: z.number(),
        nombre: z.string().min(2).max(100),
        apellido: z.string().min(2).max(100),
        telefono: z.string().min(10).max(15),
        correo: z.string().email(),
        contraseña: z.string().min(8).max(100)
    }),
    handler: async ({ id_rol, nombre, apellido, telefono, correo, contraseña }) => {
        try {
            return await addUser({ id_rol, nombre, apellido, telefono, correo, contraseña });

        } catch (error) {
            console.error("Error registering user:", error);
            throw new Error("Failed to register user");
        }
    }
});