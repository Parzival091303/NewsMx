import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getUserByEmail, verifyPassword } from "@/data";

export const loginAuth = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string()
    }),
    handler: async ({ email, password }, { cookies }) => {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            console.log("User found:", user);

            const isPasswordValid = verifyPassword(password, user.contraseña);
            if (!isPasswordValid) {
                throw new Error("Invalid email or password");
            }

            const sessionData = {
                id: user.id_usuario.toString(),
                nombre: user.nombre,
                rol: user.id_rol.toString(),
            };
            console.log("Session data to be stored in cookie:", sessionData);
            cookies.set("user", JSON.stringify(sessionData), {
                path: "/",
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
            });

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
});