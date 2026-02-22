import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { updateCategory as updateCategoryFromDB } from "@/data";

export const updateCategory = defineAction({
    accept: "json",
    input: z.object({
        id: z.number(),
        name: z.string(),
    }),
    handler: async ({ id, name }) => {
        try {
            return await updateCategoryFromDB(id, { nombre_categoria: name });
        } catch (error) {
            console.error("Error updating category:", error);
            throw new Error("Failed to update category");
        }
    }
})