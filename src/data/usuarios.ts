import { prisma } from "@/db";
import { hashSync, compareSync, genSaltSync } from "bcrypt"

export interface UserInput {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    contraseña?: string;
    id_rol: number;
}

export const getAllUsers = async () => {
    return await prisma.usuarios.findMany({
        include: {
            rol: true
        }
    });
}

export const getUserById = async (id: number) => {
    return await prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        },
        include: {
            rol: true
        }
    });
}

export const getUserByEmail = async (email: string) => {
    return await prisma.usuarios.findUnique({
        where: {
            correo: email
        },
        include: {
            rol: true
        }
    });
}



export const addUser = async (userData: UserInput) => {
    const salt = genSaltSync(10);
    return await prisma.usuarios.create({
        data: {
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono,
            correo: userData.correo,
            contraseña: hashSync(userData.contraseña!, salt),
            id_rol: userData.id_rol
        }
    });
}

export const updateUserPassword = async (email: string, newPassword: string) => {
    const salt = genSaltSync(10);
    return await prisma.usuarios.update({
        where: {
            correo: email
        },
        data: {
            contraseña: hashSync(newPassword, salt)
        }
    });
}

export const restoreUserPassword = async (id: number, newPassword: string) => {
    const salt = genSaltSync(10);
    return await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            contraseña: hashSync(newPassword, salt)
        }
    });
}

export const updateUser = async (id: number, userData: UserInput) => {
    return await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono,
            correo: userData.correo,
            contraseña: userData.contraseña,
            id_rol: userData.id_rol
        }
    });
}

export const verifyPassword = (inputPassword: string, storedHash: string): boolean => {
    return compareSync(inputPassword, storedHash);
}

export const deleteUser = async (id: number) => {
    const noticias = await prisma.noticias.findMany({
        where: { id_usuario: BigInt(id) }
    });

    for (const noticia of noticias) {
        await prisma.categorias_noticias.deleteMany({ where: { id_noticia: noticia.id_noticia } });
        await prisma.actualizacion.deleteMany({ where: { id_noticia: noticia.id_noticia } });
    }

    await prisma.noticias.deleteMany({ where: { id_usuario: BigInt(id) } });
    await prisma.actualizacion.deleteMany({ where: { id_usuario: BigInt(id) } });

    return await prisma.usuarios.delete({
        where: { id_usuario: BigInt(id) }
    });
}

export const getUserByNombreSlug = async (slug: string) => {
    const usuarios = await prisma.usuarios.findMany({
        include: { rol: true }
    });

    console.log("Buscando slug:", slug);
    console.log("Slugs generados:", usuarios.map(u => ({
        nombre: u.nombre,
        apellido: u.apellido,
        slug: `${u.nombre}-${u.apellido}`
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
    })));

    return usuarios.find(u => {
        const slugGenerado = `${u.nombre}-${u.apellido}`
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-');
        return slugGenerado === slug;
    }) ?? null;
}

export const deleteUserOnly = async (id: number) => {
    // Desvincular noticias
    await prisma.noticias.updateMany({
        where: { id_usuario: BigInt(id) },
        data: { id_usuario: null }
    });

    // Borrar actualizaciones del usuario
    await prisma.actualizacion.deleteMany({ where: { id_usuario: BigInt(id) } });

    return await prisma.usuarios.delete({
        where: { id_usuario: BigInt(id) }
    });
}