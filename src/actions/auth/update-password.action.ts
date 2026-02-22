import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { updateUserPassword } from "@/data";
export const updatePassword = defineAction({
    accept: "json",
    input: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(100)
    }),
    handler: async ({ email, password }) => {
        try {
            return await updateUserPassword(email, password);

        } catch (error) {
            console.error("Error updating user password:", error);
            throw new Error("Failed to update user password");
        }

    }
});
