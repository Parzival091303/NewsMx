import { defineAction } from "astro:actions";

import { z } from "astro:schema";
import { restoreUserPassword, getUserById } from "@/data";

export const resetPassword = defineAction({
    accept: "json",
    input: z.object({
        id: z.number().int().positive(),

    }),
    handler: async ({ id }) => {
        try {
            const user = await getUserById(id);

            if (!user) {
                throw new Error("No user found with that id");
            }
            const newPassword = `${user.nombre}${Date.now()}`.slice(0, 12);
            return await restoreUserPassword(id, newPassword);
        } catch (error) {
            console.error("Error resetting password:", error);
            throw new Error("Failed to reset password");
        }

    }
});