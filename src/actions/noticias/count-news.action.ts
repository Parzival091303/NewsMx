import { countNewsByCategory, countNewsByUserId, countNews as countAllNews } from "@/data";

export const countNews = (category?: string, userId?: number) => {
    if (category) {
        return countNewsByCategory(category);
    } else if (userId) {
        return countNewsByUserId(userId);
    } else {
        return countAllNews();
    }
}