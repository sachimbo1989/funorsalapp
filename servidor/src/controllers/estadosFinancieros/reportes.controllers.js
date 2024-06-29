import { Cuenta} from "../../models/estadosFinancieros/cuentas.models.js";
import {LibroDiario} from "../../models/estadosFinancieros/libroDiario.models.js";	
import {DetalleDiario} from "../../models/estadosFinancieros/detalleDiario.models.js";
import {Cliente} from "../../models/estadosFinancieros/cliente.models.js";

import generarPdfBalanceBase64 from '../../pdfs/pdfIngresosGastos.js';

import { Op } from "sequelize";


//Crear balance de ingresos y gastos

const crearBalanceIngresosGastosPorIdCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        let { fechaInicio, fechaFin } = req.body;
        console.log("idCliente", idCliente);
        console.log("fechaInicio", fechaInicio);
        console.log("fechaFin", fechaFin);
        fechaInicio ="2023-06-28T18:10:57.366Z"
        fechaFin ="2025-06-28T18:10:57.366Z"

        const cliente = await Cliente.findOne({
            where: { int_cliente_id: idCliente }
        });

        if (!cliente) {
            return res.status(404).json({
                status: false,
                message: "Cliente no encontrado"
            });
        }

        const libroDiario = await LibroDiario.findAll({
            where: {
                int_cliente_id: idCliente,
                dt_libro_diario_fecha: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            },
            include: {
                model: DetalleDiario,
                required: true
            }
        });

        if (libroDiario.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No se encontraron registros en el libro diario"
            });
        }

        console.log("Cantidad de registros", libroDiario.length);

        let ingresos = 0;
        let gastos = 0;
        const cuentasIngresos = {};
        const cuentasGastos = {};

        const tipoCuenta = (codigoCuenta) => {
            const tipos = {
                "1": "ACTIVOS",
                "2": "PASIVOS",
                "3": "PATRIMONIO",
                "4": "INGRESOS",
                "5": "GASTOS"
            };
            return tipos[codigoCuenta[0]];
        };

        libroDiario.forEach(element => {
            element.detalle_libro_diarios.forEach(detalle => {
                const tipo = tipoCuenta(detalle.str_detalle_libro_diario_codigo_cuenta);
                const monto = parseFloat(detalle.dc_detalle_libro_diario_monto);

                if (tipo === "INGRESOS") {
                    ingresos += monto;
                    if (!cuentasIngresos[detalle.str_detalle_libro_diario_codigo_cuenta]) {
                        cuentasIngresos[detalle.str_detalle_libro_diario_codigo_cuenta] = {
                            str_detalle_libro_diario_nombre_cuenta: detalle.str_detalle_libro_diario_nombre_cuenta,
                            str_detalle_libro_diario_codigo_cuenta: detalle.str_detalle_libro_diario_codigo_cuenta,
                            dc_detalle_libro_diario_monto: 0
                        };
                    }
                    cuentasIngresos[detalle.str_detalle_libro_diario_codigo_cuenta].dc_detalle_libro_diario_monto += monto;
                } else if (tipo === "GASTOS") {
                    gastos += monto;
                    if (!cuentasGastos[detalle.str_detalle_libro_diario_codigo_cuenta]) {
                        cuentasGastos[detalle.str_detalle_libro_diario_codigo_cuenta] = {
                            str_detalle_libro_diario_nombre_cuenta: detalle.str_detalle_libro_diario_nombre_cuenta,
                            str_detalle_libro_diario_codigo_cuenta: detalle.str_detalle_libro_diario_codigo_cuenta,
                            dc_detalle_libro_diario_monto: 0
                        };
                    }
                    cuentasGastos[detalle.str_detalle_libro_diario_codigo_cuenta].dc_detalle_libro_diario_monto += monto;
                }
            });
        });

        const infoBalanceIngresosGastos = {
            ingresos,
            gastos,
            resultado: ingresos - gastos,
            cuentasIngresos: Object.values(cuentasIngresos),
            cuentasGastos: Object.values(cuentasGastos),
            fechaInicio,
            fechaFin,
            cliente: cliente.str_cliente_nombre

        };

        const pdfBase64 = await generarPdfBalanceBase64(infoBalanceIngresosGastos);

        //devolver con la cabezera de pdf
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', "inline; filename=informe.pdf");
        res.send(Buffer.from(pdfBase64, 'base64'));

          //Para visualizar el pdf en el navegador
  /*
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=informe.pdf");
    res.send(Buffer.from(pdfBase64String, "base64"));
    */
        

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Error en el servidor"
        });
    }
};




//crear balance general

//crear balance de comprobacion




export default {
    crearBalanceIngresosGastosPorIdCliente
}