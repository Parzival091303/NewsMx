
import { prisma } from "@/db";
import { defineAction } from "astro:actions";

export const createNews = defineAction({
  accept: "form",

  async handler(formData) {
    const titulo = formData.get("titulo");
    const primer_parrafo = formData.get("primer_parrafo");
    const contenido = formData.get("contenido");
    const imagen = formData.get("imagen");
    const categorias = formData.getAll("categorias");

    // 1️⃣ Crear noticia primero
    const nuevaNoticia = await prisma.noticias.create({
      data: {
        titulo_noticia: titulo as string,
        fecha_noticia: new Date(),
        primer_parrafo: primer_parrafo as string,
        contenido: contenido as string,
        imagen: imagen as string,
        noticias_url: crypto.randomUUID(),
        id_usuario: 1n,
        status: 1n
      }
    });

    // 2️⃣ Crear relaciones en tabla puente
    if (categorias.length > 0) {
      await prisma.categorias_noticias.createMany({
        data: categorias.map((id) => ({
          id_noticia: nuevaNoticia.id_noticia,
          id_categoria: BigInt(id as string)
        }))
      });
    }

    return { success: true };
  }
});
