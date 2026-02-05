import express from "express";
import cors from "cors";
import finanzasRoutes from "./routes/finanzasRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import themeRouter from "./routes/themeRoutes.js";
import collectionRouter from "./routes/collectionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/alfi", finanzasRoutes);
app.use("/api-alfi/auth", authRoutes);
app.use("/api-alfi/tarjetas", cardRoutes);
app.use("/api-alfi/temas", themeRouter);
app.use("/api-alfi/colecciones", collectionRouter);
app.use("/api-alfi/usuarios", userRoutes);
app.use("/api-alfi/game", quizRoutes);

export default app;
