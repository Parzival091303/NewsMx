import { defineAction } from "astro:actions";
import { getAllUsers } from "@/data/usuarios";

export const allUsers = defineAction({
  accept: "json",
  handler: async () => {
    const users = await getAllUsers();
    return users.map(u => ({
      id: u.id_usuario.toString(),
      nombre: u.nombre ?? "",
      apellido: u.apellido ?? "",
      correo: u.correo,
    }));
  },
});