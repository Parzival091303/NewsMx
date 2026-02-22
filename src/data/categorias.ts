import { prisma } from "@/db";

export interface CategoriaInput {
    nombre_categoria: string;
};

export const getAllCategories = async () => {
    return await prisma.categorias.findMany();
};

export const getCategoryById = async (id: number) => {
    return await prisma.categorias.findUnique({
        where: {
            id_categoria: id
        },
    });
};

export const addCategory = async (categoriaData: CategoriaInput) => {
    return await prisma.categorias.create({
        data: {
            nombre_categoria: categoriaData.nombre_categoria
        }
    });
};

export const deleteCategory = async (id: number) => {
    return await prisma.categorias.delete({
        where: {
            id_categoria: id
        }
    });
};

export const updateCategory = async (id: number, categoriaData: CategoriaInput) => {
    return await prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: {
            nombre_categoria: categoriaData.nombre_categoria
        }
    });
};