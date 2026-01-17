import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  // ADMIN
  route("admin", "routes/admin/index.tsx"),
  route("admin/temas", "routes/admin/temas.tsx"),
  route("admin/temas/crear", "routes/admin/crearTema.tsx"),
  route("admin/colecciones", "routes/admin/colecciones.tsx"),
  // USER
  route("user", "routes/user/index.tsx"),
  route("user/finanzas", "routes/user/finanzas.tsx"),
] satisfies RouteConfig;
