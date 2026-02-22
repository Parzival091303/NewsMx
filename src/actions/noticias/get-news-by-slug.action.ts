import { getNewsBySlug as getNewsBySlugFromDB } from "@/data";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const getNewsBySlug = defineAction({
    accept: "json",
    input: z.object({
        slug: z.string()
    }),
    handler: async ({ slug }) => {
        const news = await getNewsBySlugFromDB(slug);
        return news;
    }
});