import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { deleteCategory as deleteCategoryFromDB } from "@/data";

export const deleteCategory = defineAction({
    accept: "json",
    input: z.object({
        id: z.number()
    }),
    handler: async ({ id }) => {
        try {

            return await deleteCategoryFromDB(id);
        } catch (error) {
            console.error("Error deleting category:", error);
            throw new Error("Failed to delete category");
        }
    }
})