import { defineAction } from "astro:actions";

export const logout = defineAction({
  accept: "json",
  handler: async (_, context) => {
    context.cookies.delete("user", { path: "/" });
    return { success: true };
  }
});