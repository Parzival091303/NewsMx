import { prisma } from "@/db";
import { hashSync, compareSync, genSaltSync } from "bcrypt"

export interface UserInput {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    contraseña: string;
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
            contraseña: hashSync(userData.contraseña, salt),
            id_rol: userData.id_rol
        }
    });
}

export const deleteUserById = async (id: number) => {
    return await prisma.usuarios.delete({
        where: {
            id_usuario: id
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

export const verifyPassword = (inputPassword: string, storedHash: string) : boolean => {
    return compareSync(inputPassword, storedHash);
}

export const deleteUser = async (id: number) => {
    return await prisma.usuarios.delete({
        where: {
            id_usuario: id
        }
    });
}