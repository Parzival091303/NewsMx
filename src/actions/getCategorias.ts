import { prisma } from "@/db";
import { defineAction } from "astro:actions";

export const getCategorias = defineAction({
  handler: async () => {
    return await prisma.categorias.findMany({
      orderBy: {
        nombre_categoria: "asc"
      }
    });
  }
});