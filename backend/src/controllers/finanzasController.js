import * as finanzasModel from '../models/finanzasModel.js';

const finanzas = async (req, res) => {
  const mensaje = await finanzasModel.finanzas();
  res.send(mensaje);
}

export { finanzas };