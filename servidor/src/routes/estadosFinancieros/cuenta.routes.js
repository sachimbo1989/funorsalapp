import { Router } from "express";

import cuentaController from "../../controllers/estadosFinancieros/cuenta.controllers.js";

const router = Router();

router.get("/cliente/:id", cuentaController.obtenerCuentasByIdCliente);

export default router;