import { prisma } from "@/db";
import { defineAction } from "astro:actions";

export const getCategorias = defineAction({
handler: async () => {
    const cats = await prisma.categorias.findMany({
      orderBy: { nombre_categoria: "asc" }
    });
    console.log("Categorias raw:", cats.map(c => c.nombre_categoria));
    return cats;
}
});