import { defineAction } from "astro:actions";
import { getAllNews as getAllNewsFromDB } from "@/data";
import { z } from "astro:schema";

export const getAllNews = defineAction({
    accept: "json",
    input: z.object({
        category: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional()
    }),
    handler: async ({category, limit, offset}) => {
        const news = await getAllNewsFromDB(category, limit, offset);
        return news;
    }
});