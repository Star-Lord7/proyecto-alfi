import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ALFI" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div style={{ padding: 40, textAlign: "center", flexDirection: "column", display: "flex", gap: 20 }}>
      <h1>Home</h1>
      <a href="/finanzas">Ir a Finanzas</a>
      <a href="/preguntas">Preguntas IA</a>
    </div>
  );
}
