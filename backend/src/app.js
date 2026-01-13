import express from "express";
import cors from "cors";
import finanzasRoutes from "./routes/finanzasRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import temasRouter from "./routes/temaRoutes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/alfi", finanzasRoutes);
app.use("/api/alfi", cardRoutes);
app.use("/api-alfi/temas", temasRouter);

export default app;
