import { Cuenta} from "../../models/estadosFinancieros/cuentas.models.js";

export const obtenerCuentasByIdCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cuentas = await Cuenta.findAll({
            where: {
                int_cliente_id: id
            }
        });
        res.json({
            status: true,
            message: "Cuentas encontradas",
            body: cuentas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las cuentas",
        });
    }
};


export default {
    obtenerCuentasByIdCliente,
};