import { Cuenta} from "../../models/estadosFinancieros/cuentas.models.js";
import {LibroDiario} from "../../models/estadosFinancieros/libroDiario.models.js";
import {DetalleDiario} from "../../models/estadosFinancieros/detalleDiario.models.js";

const crearDetalleDiario = async (req, res) => {
    
    try {
        
        const infoLibroDiario = req.body;
        console.log(infoLibroDiario);
        //Primero llena la tabla libro diario (padre)
        const libroDiarioId = await LibroDiario.create({
            dt_libro_diario_fecha : infoLibroDiario.fecha,
            int_cliente_id: infoLibroDiario.idCliente,

        });
        //recorre el array de detalles y los inserta en la tabla detalle diario
        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al crear el detalle diario",
            data: {}
        });
    }
}

export default {
    crearDetalleDiario
}
