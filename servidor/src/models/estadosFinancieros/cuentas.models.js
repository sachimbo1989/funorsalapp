import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { TipoCuenta } from './tipoCuentas.models.js';
import {Cliente} from '../estadosFinancieros/cliente.models.js';

export const Cuenta = sequelize.define('cuenta', {
    int_cuenta_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    int_tipo_cuenta_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoCuenta,
            key: 'int_tipo_cuenta_id'
        }
    },
    str_cuenta_nombre: {
        type: DataTypes.STRING
    },
    int_cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'int_cliente_id'
        }
    },
    str_cuenta_descripcion: {
        type: DataTypes.STRING
    },
    dc_cuenta_saldo_inicial: {
        type: DataTypes.DECIMAL
    },
    dc_cuenta_saldo_actual: {
        type: DataTypes.DECIMAL
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});