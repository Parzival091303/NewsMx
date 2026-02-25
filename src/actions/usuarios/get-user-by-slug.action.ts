import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getUserByNombreSlug } from "@/data/usuarios";

export const getUserBySlug = defineAction({
    accept: "json",
    input: z.object({
        slug: z.string(),
    }),
    handler: async ({ slug }) => {
        try {
            return await getUserByNombreSlug(slug);
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Failed to get user");
        }
    }
});