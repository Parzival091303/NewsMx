import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { getNewsById as getNewsByIdFromDB } from "@/data";

export const getNewsById = defineAction({
    accept: "json",
    input: z.object({
        id: z.number()
    }),
    handler: async ({ id }) => {
        const news = await getNewsByIdFromDB(id);
        return news;
    }
});