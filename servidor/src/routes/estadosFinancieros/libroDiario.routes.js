import { Router } from "express";

import libroDiarioController from "../../controllers/estadosFinancieros/libroDiario.controllers.js";

const router = Router();

router.post("/", libroDiarioController.crearDetalleDiario);

export default router;