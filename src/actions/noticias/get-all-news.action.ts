import { defineAction } from "astro:actions";
import { getAllNews as getAllNewsFromDB, countNews } from "@/data";
import { z } from "astro:schema";

export const getAllNews = defineAction({
    accept: "json",
    input: z.object({
        limit: z.number().optional().default(10),
        offset: z.number().optional().default(0)
    }),
    handler: async ({ limit, offset }) => {
        const [news, newsAmount] = await Promise.all([
            getAllNewsFromDB(undefined, limit, offset),
            countNews()
        ]);

        const totalPages = Math.ceil(newsAmount / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const hasNext = offset + limit < newsAmount;
        const hasPrevious = offset > 0;

        return {
            news,
            pagination: {
                totalItems: newsAmount,
                totalPages,
                currentPage,
                limit,
                offset,
                hasNext,
                hasPrevious
            }
        };
    }
});