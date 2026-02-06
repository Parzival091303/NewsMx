import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export const getNews = defineAction({
    input: z.object({
        category: z.string().optional(),
        author: z.string().optional(),
    })
    ,
    handler: async (input) => {
        console.log("Fetching news with input:", input);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    }
});