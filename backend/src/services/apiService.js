import fetch from "node-fetch";
import "dotenv/config";

async function index(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Mi App NodeJS",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini", // Aqui podemos cambiar a otros modelos
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices.length) {
      console.error("Respuesta inválida de OpenRouter:", data);
      throw new Error("Error de respuesta de OpenRouter");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error al usar OpenRouter:", error.message);
    throw error;
  }
}

export default index;
