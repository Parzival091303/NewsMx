import { defineAction } from "astro:actions";
import { updateNews as updateNewsFromDB, deleteNewsById } from "@/data";
import { z } from "astro:schema";

export const updateNews = defineAction({
  accept: "json",
  input: z.object({
    id_noticia:     z.string(),
    titulo_noticia: z.string().optional(),
    primer_parrafo: z.string().optional(),
    contenido:      z.string().optional(),
    imagen:         z.string().optional(),
    noticias_url:   z.string().optional(),
    fecha_noticia:  z.string().optional(),
    status:         z.string().optional(),
    categorias:     z.array(z.string()).optional(),
  }),
handler: async ({ id_noticia, titulo_noticia, primer_parrafo, contenido, imagen, noticias_url, categorias, fecha_noticia }) => {
    await updateNewsFromDB(Number(id_noticia), {
      titulo:        titulo_noticia ?? "",
      primerParrafo: primer_parrafo ?? "",
      contenido:     contenido ?? "",
      url:           noticias_url ?? "",
      imagen:        imagen,
      idUsuario:     0,
      categorias:    categorias ?? [],
      fecha:         fecha_noticia,
    });
    return { success: true };
  },
});

export const deleteNews = defineAction({
  accept: "json",
  input: z.object({
    id_noticia: z.string(),
  }),
  handler: async ({ id_noticia }) => {
    await deleteNewsById(Number(id_noticia));
    return { success: true };
  },
});