import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { deleteUser as deleteUserFromDB } from "@/data";
export const deleteUser = defineAction({
    accept: "json",
    input: z.object({
        id: z.number()
    }),
    handler: async ({ id }) => {
        try {
            return await deleteUserFromDB(id);

        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user");
        }

    }
});