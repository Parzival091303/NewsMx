import { prisma } from "@/db";

export const getAllNews = async () => {
    return await prisma.noticias.findMany();
};

export const getNewById = async (id: number) => {
    return await prisma.noticias.findUnique({
        where: {
            id_noticia: id
        }
    });
};