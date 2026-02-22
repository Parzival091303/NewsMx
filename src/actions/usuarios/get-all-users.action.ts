import { defineAction } from "astro:actions";
import { getAllUsers as getAllUsersFromDB } from "@/data";
export const getAllUsers = defineAction({
    
    handler: async () => {
        try {
            return await getAllUsersFromDB();

        } catch (error) {
            console.error("Error getting all users:", error);
            throw new Error("Failed to get all users");
        }

    }
});