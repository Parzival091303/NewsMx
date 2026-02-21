import { prisma } from "@/db";
import { defineAction } from "astro:actions";

export const noticiasId = defineAction({
  async handler(id: string) {
    try {
      const noticia = await prisma.noticias.findUnique({
        where: {
          id_noticia: Number(id),
        },
        include: {
          categorias: {
            include: {
              categoria: true,
            },
          },
          usuario: true,
        },
      });

      return { data: noticia };
    } catch (error) {
      console.error(error);
      return { error: "No se pudo obtener la noticia" };
    }
  },
});