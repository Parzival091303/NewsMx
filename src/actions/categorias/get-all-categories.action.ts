import { defineAction } from "astro:actions";
import { getAllCategories as getAllCategoriesFromDB } from "@/data";
export const getAllCategories = defineAction({
    handler: async () => {
        try {
            return await getAllCategoriesFromDB();
        } catch (error) {
            console.error("Error getting all categories:", error);
            throw new Error("Failed to get all categories");
        }
    }
})