
import { prisma } from "@/db";
import { defineAction } from "astro:actions";

export const obtNoticias = defineAction({
  async handler() {
    try {
      const noticias = await prisma.noticias.findMany({
        orderBy: {
          fecha_noticia: "desc",
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

      return {
        data: noticias,
      };
    } catch (error) {
      console.error("Error al obtener noticias:", error);

      return {
        error: "No se pudieron obtener las noticias",
      };
    }
  },
});
