import { prisma } from "../db";

export async function getPlacesForBuild() {
  return await prisma.place.findMany();
}

export async function getPlaceById(id: string) {
  return await prisma.place.findUnique({
    where: {
      id: Number(id),
    },
  });
}
