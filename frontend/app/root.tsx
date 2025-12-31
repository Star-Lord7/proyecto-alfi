import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Finanzas from "./routes/finanzas";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/finanzas" element={<Finanzas />} />
    </Routes>
  );
}
