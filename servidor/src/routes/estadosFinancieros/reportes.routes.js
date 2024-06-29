import { Router } from "express";

import reportesController from "../../controllers/estadosFinancieros/reportes.controllers.js";

const router = Router();

router.get("/ingresos-gastos/:idCliente", reportesController.crearBalanceIngresosGastosPorIdCliente);

export default router;