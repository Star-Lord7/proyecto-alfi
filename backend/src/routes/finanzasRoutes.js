import express from 'express';
import * as finanzasController from '../controllers/finanzasController.js';

const router = express.Router();

router.get('/finanzas', finanzasController.finanzas);

export default router;