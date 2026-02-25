import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { deleteUserOnly as deleteUserOnlyFromDB } from "@/data/usuarios";

export const deleteUserOnly = defineAction({
    accept: "json",
    input: z.object({ id: z.number() }),
    handler: async ({ id }) => {
        try {
            return await deleteUserOnlyFromDB(id);
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Failed to delete user");
        }
    }
});