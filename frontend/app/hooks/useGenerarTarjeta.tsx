import { useEffect, useState } from "react";

export interface Tema {
  id: number;
  nombre: string;
}

export interface Coleccion {
  id: number;
  titulo: string;
  temaId: number;
}

interface MensajeEstado {
  tipo: "loading" | "success" | "error";
  texto: string;
}

// Hook principal
export const useGenerarTarjeta = (onClose?: () => void) => {

  const [temas, setTemas] = useState<Tema[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);

  // Formulario
  const [temaId, setTemaId] = useState<number | "">("");
  const [coleccionId, setColeccionId] = useState<number | "">("");
  const [segmento, setSegmento] = useState<string>("");
  const [dificultad, setDificultad] = useState<string>("BASICO");

  const [mensaje, setMensaje] = useState<MensajeEstado | null>(null);
  const [creando, setCreando] = useState(false);

  // Cargar temas
  useEffect(() => {
    fetch("http://localhost:3000/api-alfi/temas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar temas");
        return res.json();
      })
      .then(setTemas)
      .catch((err) => {
        console.error(err);
        setMensaje({
          tipo: "error",
          texto: "No se pudieron cargar los temas",
        });
      });
  }, []);

  // Cargar colecciones por tema
  useEffect(() => {
    if (!temaId) {
      setColecciones([]);
      setColeccionId("");
      return;
    }

    fetch(`http://localhost:3000/api-alfi/colecciones/tema/${temaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar colecciones");
        return res.json();
      })
      .then(setColecciones)
      .catch((err) => {
        console.error(err);
        setMensaje({
          tipo: "error",
          texto: "No se pudieron cargar las colecciones",
        });
      });
  }, [temaId]);

  // Crear tarjeta
  const handleCrearTarjeta = async () => {
    if (!segmento || !coleccionId || !dificultad) {
      setMensaje({
        tipo: "error",
        texto: "Complete todos los campos antes de continuar",
      });
      return;
    }

    try {
      setCreando(true);
      setMensaje({ tipo: "loading", texto: "Creando tarjeta..." });

      const payload = {
        segmento,
        dificultad,
        coleccionId: Number(coleccionId),
      };

      console.log("Payload crear tarjeta:", payload);

      const response = await fetch("http://localhost:3000/api-alfi/tarjetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error al crear la tarjeta");
      }

      setMensaje({
        tipo: "success",
        texto: "Tarjeta creada exitosamente",
      });

      // Cerrar modal luego de mostrar éxito
      setTimeout(() => {
        setMensaje(null);
        setCreando(false);
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error(error);
      setCreando(false);
      setMensaje({
        tipo: "error",
        texto: "Error al crear la tarjeta",
      });
    }
  };

  return {
    // datos
    temas,
    colecciones,

    // formulario
    temaId,
    setTemaId,
    coleccionId,
    setColeccionId,
    segmento,
    setSegmento,
    dificultad,
    setDificultad,

    // acciones
    handleCrearTarjeta,

    // ui
    mensaje,
    creando,
    setMensaje,
  };
};