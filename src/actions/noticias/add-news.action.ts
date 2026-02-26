import { uploadImage } from "@/data";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { addNews as addNewsToDB } from "@/data";

export const addNews = defineAction({
    accept: "form",
    input: z.object({
        titulo: z.string(),
        primer_parrafo: z.string(),
        contenido: z.string(),
        imagen: z.instanceof(File).refine(file => file.type.startsWith("image/"), {
            message: "El archivo debe ser una imagen",
        }).refine(file => file.size <= 5 * 1024 * 1024, {
            message: "El archivo debe ser menor a 5MB",
        }),
        categorias: z.array(z.string()),
        slug: z.string(),
        fecha_noticia: z.string().optional(),
    }),
    handler: async (input, { cookies }) => {
        const arrayBuffer = await input.imagen.arrayBuffer();
        const unit8Array = new Uint8Array(arrayBuffer);
        const base64Image = Buffer.from(unit8Array).toString('base64');
        const dataURI = `data:${input.imagen.type};base64,${base64Image}`;
        try {
            const userCookie = cookies.get("user");
            const user = userCookie ? JSON.parse(userCookie.value) : null;
            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            const imageUrl = await uploadImage(dataURI);
            const newsData = {
                titulo: input.titulo,
                primerParrafo: input.primer_parrafo,
                contenido: input.contenido,
                imagen: imageUrl,
                categorias: input.categorias,
                idUsuario: user.id,
                url: input.slug,
                fecha: input.fecha_noticia,
            };
            const result = await addNewsToDB(newsData);
            return result;

        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new Error("Error al subir la imagen");
        }
    }
});