import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getUserById as getUserFromDB } from "@/data";
export const getUserById = defineAction({
    accept: "json",
    input: z.object({
        id: z.number()
    }),
    handler: async ({ id }) => {
        try {
            return await getUserFromDB(id);

        } catch (error) {
            console.error("Error getting user by id:", error);
            throw new Error("Failed to get user by id");
        }

    }
});