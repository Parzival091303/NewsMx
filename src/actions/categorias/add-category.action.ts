import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { addCategory as addCategoryToDB } from "@/data";

export const addCategory = defineAction({
    accept: "json",
    input: z.object({
        nombre: z.string()
    }),
    handler: async ({ nombre }) => {
        try {
            return await addCategoryToDB({nombre_categoria: nombre});
        } catch (error) {
            console.error("Error adding category:", error);
            throw new Error("Failed to add category");
        }
    }
})