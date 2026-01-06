import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Finanzas from "./routes/finanzas";
import Preguntas from "./routes/Preguntas";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/finanzas" element={<Finanzas />} />
      <Route path="/preguntas" element={<Preguntas />} />
    </Routes>
  );
}
