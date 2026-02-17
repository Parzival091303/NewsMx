import { defineAction } from "astro:actions";
import { prisma } from "../../db";

export const getPlaces = defineAction({
  handler: async () => {
    const places = await prisma.place.findMany();
    return { data: places };
  },
});
