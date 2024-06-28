import { Router } from "express";

import libroDiarioController from "../../controllers/estadosFinancieros/libroDiario.controllers.js";

const router = Router();

router.post("/", libroDiarioController.crearDetalleDiario);
router.get("/cliente/:idCliente",libroDiarioController.obtenerLibroDiarioByIdCliente)


export default router;