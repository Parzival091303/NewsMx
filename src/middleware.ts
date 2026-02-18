import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  const user = context.cookies.get("user");

  if (context.url.pathname.startsWith("/admin") && !user) {
    return context.redirect("/login");
  }

  return next();
});
