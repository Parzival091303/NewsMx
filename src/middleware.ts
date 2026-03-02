import { defineMiddleware } from "astro/middleware";

const ACCESS_SECRET = "nmtv-privacidad-2026";

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  const method = context.request.method;

  // ── Siempre públicas
  if (path === "/acceso-denegado") {
    return next();
  }

  // ── /privacidad → genera token en cookie
  if (path === "/privacidad") {
    const res = await next();
    res.headers.append(
      "Set-Cookie",
      `login_access=${ACCESS_SECRET}; Path=/; HttpOnly; SameSite=Strict; Max-Age=300`
    );
    return res;
  }

  // ── /login GET → solo si tiene token válido
  // ── /login POST → siempre permitir (es el submit del formulario)
  if (path === "/login") {
    if (method === "POST") {
      // El formulario siempre puede hacer POST
      return next();
    }

    // GET: verificar token
    const token = context.cookies.get("login_access")?.value;
    if (token !== ACCESS_SECRET) {
      return context.redirect("/");
    }

    // Token válido → dejar pasar y borrarlo
    const res = await next();
    res.headers.append(
      "Set-Cookie",
      `login_access=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    );
    return res;
  }

  // ── /admin → requiere cookie user activa
  if (path.startsWith("/admin")) {
    const user = context.cookies.get("user")?.json();

    if (!user) {
      return context.redirect("/");
    }

    const rol = String(user?.rol ?? "");

    // WebMaster (3) → acceso total
    if (rol === "3") {
      return next();
    }

    // Administrador (2)
    if (rol === "2") {
      const permitido = ["/admin/editor", "/admin/noticia"];
      if (!permitido.some((r) => path.startsWith(r))) {
        return context.redirect("/acceso-denegado");
      }
    }

    // Editor (1)
    if (rol === "1") {
      const permitido = ["/admin/registroNews", "/admin/registroCategoria"];
      if (!permitido.some((r) => path.startsWith(r))) {
        return context.redirect("/acceso-denegado");
      }
    }

    return next();
  }

  return next();
});