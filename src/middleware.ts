import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  const path = context.url.pathname;

  //  Rutas públicas
  if (path === "/login" || path === "/acceso-denegado") {
    return next();
  }

  const user = context.cookies.get("user")?.json();

  //  Si intenta entrar a /admin sin sesión → login
  if (path.startsWith("/admin") && !user) {
    return context.redirect("/login");
  }

  const rol = String(user?.rol ?? "");

  //  WebMaster (3) → acceso total
  if (rol === "3") {
    return next();
  }

  //  Administrador (2)
  if (rol === "2") {
    const permitido = ["/admin/editor", "/admin/noticia"];
    const tieneAcceso = permitido.some((r) => path.startsWith(r));

    if (path.startsWith("/admin") && !tieneAcceso) {
      return context.redirect("/acceso-denegado");
    }
  }

  //  Editor (1)
  if (rol === "1") {
    const permitido = ["/admin/registroNews", "/admin/registroCategoria"];
    const tieneAcceso = permitido.some((r) => path.startsWith(r));

    if (path.startsWith("/admin") && !tieneAcceso) {
      return context.redirect("/acceso-denegado");
    }
  }

  return next();
});