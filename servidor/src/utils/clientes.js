import { Cliente } from '../models/estadosFinancieros/cliente.models.js';
import { TipoCuenta } from "../models/estadosFinancieros/tipoCuentas.models.js";
import { Cuenta } from "../models/estadosFinancieros/cuentas.models.js";
import { TipoDetalle } from "../models/estadosFinancieros/tipoDetalle.models.js";
import { LibroDiario } from "../models/estadosFinancieros/libroDiario.models.js";
import { TipoTransaccion } from "../models/estadosFinancieros/tipoTransaccion.models.js";
import { LibroMayor } from "../models/estadosFinancieros/libroMayor.models.js";
import { DetalleDiario } from "../models/estadosFinancieros/detalleTransaccion.models.js";

/**
 * int_cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_cliente_nombre: {
        type: DataTypes.STRING
    },
    str_cliente_ruc: {
        type: DataTypes.STRING
    },
    str_cliente_correo: {
        type: DataTypes.STRING
    },
    str_cliente_telefono: {
        type: DataTypes.STRING
    },
    str_cliente_direccion: {
        type: DataTypes.STRING
    },
    dt_fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dt_fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
 */

    /**
     * informacion ejemplo
     * Ejemplos de Datos
Tabla: Tipo_Transacciones
id	nombre
1	Ingreso
2	Egreso
Tabla: Tipo_Cuentas
id	nombre
1	Activo
2	Pasivo
3	Patrimonio
4	Ingreso
5	Gasto
Tabla: Tipo_Detalles
id	nombre
1	Debe
2	Haber
Tabla: Transacciones
id	fecha	tipo_id	descripción	monto	cuenta_id	usuario_id
1	2024-05-01	1	Venta de producto	500.00	1	1
2	2024-05-02	2	Compra de insumos	200.00	2	2
Tabla: Cuentas
id	nombre	tipo_id	saldo_inicial	saldo_actual
1	Caja	1	1000.00	1500.00
2	Proveedores	2	0.00	200.00
3	Ventas	4	0.00	500.00
4	Compra de Insumos	5	0.00	200.00
Tabla: Detalles_Transacciones
id	transaccion_id	cuenta_id	cantidad	tipo_id
1	1	1	500.00	1
2	1	3	500.00	2
3	2	2	200.00	1
4	2	4	200.00	2
Este esquema normalizado mejora la consistencia y permite la expansión de los tipos sin necesidad de cambiar la estructura de las tablas principales.
     */
    //creamos 31 clientes
let clientes = [
    {
        int_cliente_id: 1,
        str_cliente_nombre: 'Cliente 1',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 1',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 2,
        str_cliente_nombre: 'Cliente 2',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 2',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 3,
        str_cliente_nombre: 'Cliente 3',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 3',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 4,
        str_cliente_nombre: 'Cliente 4',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 4',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 5,
        str_cliente_nombre: 'Cliente 5',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 5',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 6,
        str_cliente_nombre: 'Cliente 6',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 6',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 7,
        str_cliente_nombre: 'Cliente 7',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 7',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 8,
        str_cliente_nombre: 'Cliente 8',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 8',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 9,
        str_cliente_nombre: 'Cliente 9',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 9',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 10,
        str_cliente_nombre: 'Cliente 10',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 10',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 11,
        str_cliente_nombre: 'Cliente 11',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 11',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 12,
        str_cliente_nombre: 'Cliente 12',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 12',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 13,
        str_cliente_nombre: 'Cliente 13',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 13',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 14,
        str_cliente_nombre: 'Cliente 14',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 14',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
    {
        int_cliente_id: 15,
        str_cliente_nombre: 'Cliente 15',
        str_cliente_ruc: '123456789',
        str_cliente_correo: '',
        str_cliente_telefono: '0987654321',
        str_cliente_direccion: 'Direccion 15',
        dt_fecha_actualizacion: new Date(),
        dt_fecha_creacion: new Date()
    },
]

let tipoCuentas = [
    {
        int_tipo_cuenta_id: 1,
        str_tipo_cuenta_nombre: 'Activo',
        str_tipo_cuenta_descripcion: 'Cuentas de Activo',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_cuenta_id: 2,
        str_tipo_cuenta_nombre: 'Pasivo',
        str_tipo_cuenta_descripcion: 'Cuentas de Pasivo',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_cuenta_id: 3,
        str_tipo_cuenta_nombre: 'Patrimonio',
        str_tipo_cuenta_descripcion: 'Cuentas de Patrimonio',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_cuenta_id: 4,
        str_tipo_cuenta_nombre: 'Ingresos',
        str_tipo_cuenta_descripcion: 'Cuentas de Ingresos',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_cuenta_id: 5,
        str_tipo_cuenta_nombre: 'Egresos',
        str_tipo_cuenta_descripcion: 'Cuentas de Egresos',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    }
]

let tipoDetalles = [
    {
        int_tipo_detalle_id: 1,
        str_tipo_detalle_nombre: 'Debe',
        str_tipo_detalle_descripcion: 'Debe',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_detalle_id: 2,
        str_tipo_detalle_nombre: 'Haber',
        str_tipo_detalle_descripcion: 'Haber',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    }
]

let tipoTransacciones = [
    {
        int_tipo_transaccion_id: 1,
        str_tipo_transaccion_nombre: 'Ingreso',
        str_tipo_transaccion_descripcion: 'Ingreso',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    },
    {
        int_tipo_transaccion_id: 2,
        str_tipo_transaccion_nombre: 'Egreso',
        str_tipo_transaccion_descripcion: 'Egreso',
        dt_fecha_creacion: new Date(),
        dt_fecha_actualizacion: new Date()
    }
]

export const createTipoCuentas = async () => {
    const tipoCuenta = await TipoCuenta.bulkCreate(tipoCuentas);
}

export const createTipoDetalles = async () => {
    const tipoDetalle = await TipoDetalle.bulkCreate(tipoDetalles);
}

export const createTipoTransacciones = async () => {
    const tipoTransaccion = await TipoTransaccion.bulkCreate(tipoTransacciones);
}

export const createCuentas = async () => {
    let cuentas = [
        {
            int_cuenta_id: 1,
            int_tipo_cuenta_id: 1,
            str_cuenta_nombre: 'Caja',
            int_cliente_id: 1,
            str_cuenta_descripcion: 'Caja',
            dc_cuenta_saldo_inicial: 1000.00,
            dc_cuenta_saldo_actual: 1500.00
        },
        {
            int_cuenta_id: 2,
            int_tipo_cuenta_id: 2,
            str_cuenta_nombre: 'Proveedores',
            int_cliente_id: 2,
            str_cuenta_descripcion: 'Proveedores',
            dc_cuenta_saldo_inicial: 0.00,
            dc_cuenta_saldo_actual: 200.00
        },
        {
            int_cuenta_id: 3,
            int_tipo_cuenta_id: 4,
            str_cuenta_nombre: 'Ventas',
            int_cliente_id: 3,
            str_cuenta_descripcion: 'Ventas',
            dc_cuenta_saldo_inicial: 0.00,
            dc_cuenta_saldo_actual: 500.00
        },
        {
            int_cuenta_id: 4,
            int_tipo_cuenta_id: 5,
            str_cuenta_nombre: 'Compra de Insumos',
            int_cliente_id: 4,
            str_cuenta_descripcion: 'Compra de Insumos',
            dc_cuenta_saldo_inicial: 0.00,
            dc_cuenta_saldo_actual: 200.00
        }
    ]
    const cuenta = await Cuenta.bulkCreate(cuentas);
}



export const createClientes = async () => {

//bulcamos para crear clientes
const cliente = await Cliente.bulkCreate(clientes);
}

