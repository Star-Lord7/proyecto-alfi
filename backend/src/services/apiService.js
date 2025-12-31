import fetch from "node-fetch";
import 'dotenv/config';

async function index(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Opcional: añade tu app y sitio
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mi App NodeJS",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",  // Aqui podemos cambiar a otros modelos
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
    // console.log(data.choices[0].message.content);

  } catch (error) {
    console.error("Error al usar OpenRouter:", error);
  }
}

export default index;


// export async function generarImagen(prompt) {
//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/images", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "http://localhost:3000",
//         "X-Title": "Mi App NodeJS",
//       },
//       body: JSON.stringify({
//         model: "stabilityai/stable-diffusion-xl",   // Cambia el modelo si deseas
//         prompt: prompt,
//         size: "1024x1024",  // Puedes cambiarlo a 512x512, 768x768, etc.
//         // Opción: negative_prompt si quieres filtrar cosas
//       })
//     });

//     const raw = await response.text();

//     const data = JSON.parse(raw);

//     // URL directa de la imagen generada
//     // return data.data[0].url;
//     return data.data;

//   } catch (error) {
//     console.error("Error generando imagen con OpenRouter:", error);
//     return null;
//   }
// }

// generarImagen("Un cohete futurista despegando en un atardecer");