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
    // Genera el slug a partir del url proporcionado, quitando los espacios en blanco y caracteres especiales y los remplace por "-" y pasando a minúsculas
    const slug = newsData.url.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // actualiza la noticia
    return await prisma.noticias.update({
        // where
        where: {
            id_noticia: id
        },
        // los datos de la noticia a actualizar
        data: {
            titulo_noticia: newsData.titulo,
            primer_parrafo: newsData.primerParrafo,
            contenido: newsData.contenido,
            noticias_url: slug,
            imagen: newsData.imagen,
            categorias: {
                // limpia las relaciones con la categoría para luego volver a crear las relaciones con las categorías actualizadas
                deleteMany: {}, 
                // mapea el array de strings a la estructura de Prisma para crear las relaciones con las categorías, usando connectOrCreate para evitar duplicados
                create: newsData.categorias.map((nombre) => ({
                    categoria: {
                        connectOrCreate: {
                            where: { nombre_categoria: nombre },
                            create: { nombre_categoria: nombre }
                        }
                    }
                }))
            }
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
            }
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
    return await prisma.noticias.delete({
        where: {
            id_noticia: id
        }
    })
}

export async function addNews(newsData: NewsInput) {
    const slug = newsData.url.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

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
                create: newsData.categorias.map((nombre) => ({
                    categoria: {
                        connectOrCreate: {
                            where: { nombre_categoria: nombre }, 
                            create: { nombre_categoria: nombre }
                        }
                    }
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
