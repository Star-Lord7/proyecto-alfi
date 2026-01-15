import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function promptTexto(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  // console.log(response.text);
  return response.text;
}

async function promptImagen() {
  const prompt =
    "Genera una imagen de un astronauta montando un caballo en Marte al estilo de una pintura al óleo";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}

export { promptTexto, promptImagen };
