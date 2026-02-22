import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { updateUser as updateUserFromDB } from "@/data";
export const updateUser = defineAction({
    accept: "json",
    input: z.object({
        id_usuario: z.number(),
        id_rol: z.number(),
        nombre: z.string().max(100),
        apellido: z.string().max(100),
        telefono: z.string().max(20),
        correo: z.string().email()
    }),
    handler: async ({ id_usuario, id_rol, nombre, apellido, telefono, correo }) => {
        try {
            return await updateUserFromDB(id_usuario, { id_rol, nombre, apellido, telefono, correo });

        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }

    }
});