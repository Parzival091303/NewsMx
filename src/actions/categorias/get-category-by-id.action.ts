import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getCategoryById as getCategoryByIdFromDB } from "@/data";

export const getCategoryById = defineAction({
    accept: "json",
    input: z.object({
        id: z.number()
    }),
    handler: async ({ id }) => {
        try {
            return await getCategoryByIdFromDB(id);
        } catch (error) {
            console.error("Error getting category by id:", error);
            throw new Error("Failed to get category by id");
        }
    }   
})