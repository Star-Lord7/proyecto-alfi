import express from 'express';
import cors from 'cors';
import finanzasRoutes from './routes/finanzasRoutes.js';

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/alfi', finanzasRoutes);

export default app;