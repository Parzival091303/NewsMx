import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getAllNews as getNewsByCategoryFromDB, countNewsByCategory } from "@/data";

export const getNewsByCategory = defineAction({
    accept: "json",
    input: z.object({
        category: z.string(),
        offset: z.number().optional().default(0),
        limit: z.number().optional().default(10),
    }),
    handler: async ({ category, offset, limit }) => {
        try {
            const [news, total] = await Promise.all([
                getNewsByCategoryFromDB(category, limit, offset),
                countNewsByCategory(category)
            ]);

            const totalPages = Math.ceil(total / limit);
            const currentPage = Math.floor(offset / limit) + 1;
            const hasNext = offset + limit < total;
            const hasPrevious = offset > 0;

            return {
                news,
                pagination: {
                    totalItems: total,
                    totalPages,
                    currentPage,
                    limit,
                    offset,
                    hasNext,
                    hasPrevious
                }
            };

        } catch (error) {
            console.error("Error fetching news by category:", error);
            throw new Error("Failed to fetch news by category");
        }
    }
})