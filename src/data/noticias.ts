import { prisma } from "@/db";

export interface NewsInput {
    titulo: string;
    primerParrafo: string;
    contenido: string;
    url: string;
    imagen?: string;
    idUsuario: number;
    categorias: string[];
}

export const getNewsBySlug = async (slug : string) => {
    return await prisma.noticias.findUnique({
        where: {
            noticias_url: slug
        },
        include: {
            categorias: {
                include: { categoria: true }
            },
            usuario: {
                include: { rol: true }
            }
        }
    });
}

export const updateNews = async (id: number, newsData: NewsInput) => {
    const slug = newsData.url.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // 1. Borrar categorías anteriores
    await prisma.categorias_noticias.deleteMany({
        where: { id_noticia: id }
    });

// 2. Buscar o crear cada categoría y obtener su id
const categoriasIds = await Promise.all(
    newsData.categorias.map(async (nombre) => {
        let cat = await prisma.categorias.findFirst({
            where: { nombre_categoria: nombre }
        });
        if (!cat) {
            cat = await prisma.categorias.create({
                data: { nombre_categoria: nombre }
            });
        }
        return cat.id_categoria;
    })
);

    // 3. Crear las nuevas relaciones
    await prisma.categorias_noticias.createMany({
        data: categoriasIds.map((id_categoria) => ({
            id_noticia: id,
            id_categoria,
        })),
    });

    // 4. Actualizar la noticia
    return await prisma.noticias.update({
        where: { id_noticia: id },
        data: {
            titulo_noticia: newsData.titulo,
            primer_parrafo: newsData.primerParrafo,
            contenido: newsData.contenido,
            noticias_url: slug,
            imagen: newsData.imagen,
        },
        include: {
            categorias: {
                include: { categoria: true }
            }
        }
    });
};
export const getNewsByUserId = async (userId: number) => {
    return await prisma.noticias.findMany({
        where: {
            id_usuario: userId
        },
        include: {
            categorias: {
                include: { categoria: true }
            },
            usuario: {
                include: { rol: true }
            }
        }
    });
};

export const countNewsByUserId = async (userId: number) => {
    return await prisma.noticias.count({ where: { id_usuario: userId } });
}

export const countNews = async() => {
    return await prisma.noticias.count();
}
export const countNewsByCategory = async (category: string) => {
    return await prisma.noticias.count({
        where: {
            categorias: {
                some: {
                    categoria: {
                        nombre_categoria: category
                    }
                }
            }
        }
    });
}


export const getAllNews = async (category?: string, limit: number = 10, offset: number = 0) => {

    return await prisma.noticias.findMany({
        where: {
            categorias: category ? {
                some: {
                    categoria: {
                        nombre_categoria: category
                    }
                }
            } : undefined
        },
        include: {
            categorias: {
                include: { categoria: true }
            },
            usuario: true
        },
        take: limit,
        skip: offset,
        orderBy: {
            fecha_noticia: "desc"
        }
    });
};

export const getNewsById = async (id: number) => {
    return await prisma.noticias.findUnique({
        where: {
            id_noticia: id
        },
        include: {
            categorias: {
                include: { categoria: true }
            },
            usuario: {
                include: { rol: true }
            }
        }
    });
};

export const deleteNewsById = async (id: number) => {
    await prisma.categorias_noticias.deleteMany({ where: { id_noticia: id } });
    await prisma.actualizacion.deleteMany({ where: { id_noticia: id } });
    return await prisma.noticias.delete({ where: { id_noticia: id } });
}

export async function addNews(newsData: NewsInput) {
    const slug = newsData.url.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Buscar o crear cada categoría
    const categoriasIds = await Promise.all(
        newsData.categorias.map(async (nombre) => {
            let cat = await prisma.categorias.findFirst({
                where: { nombre_categoria: nombre }
            });
            if (!cat) {
                cat = await prisma.categorias.create({
                    data: { nombre_categoria: nombre }
                });
            }
            return cat.id_categoria;
        })
    );

    return await prisma.noticias.create({
        data: {
            titulo_noticia: newsData.titulo,
            primer_parrafo: newsData.primerParrafo,
            contenido: newsData.contenido,
            noticias_url: slug,
            imagen: newsData.imagen,
            fecha_noticia: new Date(),
            usuario: {
                connect: { id_usuario: newsData.idUsuario }
            },
            categorias: {
                create: categoriasIds.map((id_categoria) => ({
                    id_categoria
                }))
            }
        },
        include: {
            categorias: {
                include: { categoria: true }
            },
            usuario: {
                include: { rol: true }
            }
        }
    });
}