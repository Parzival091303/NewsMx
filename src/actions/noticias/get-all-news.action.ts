import { defineAction } from "astro:actions";
import { getAllNews as getAllNewsFromDB } from "@/data/noticias";

export const getAllNews = defineAction({
    handler: async () => {
        const news = await getAllNewsFromDB();
        return news;
    }
});