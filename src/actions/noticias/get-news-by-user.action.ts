import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getNewsByUserId as getNewsByUserFromDB } from "@/data";

export const getNewsByUserId = defineAction({
    accept: "json",
    input: z.object({
        userId: z.number(),
    }),
    handler: async ({ userId }) => {
        try {
            return await getNewsByUserFromDB(userId);

        } catch (error) {
            console.error("Error fetching news by user:", error);
            throw new Error("Failed to fetch news by user");
        }
    }
})