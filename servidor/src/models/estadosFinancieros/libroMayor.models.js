import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { Cuenta } from './cuentas.models.js';
import { Cliente } from './cliente.models.js';

export const LibroMayor = sequelize.define('libro_mayor', {
    int_libro_mayor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dt_libro_mayor_fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    int_cuenta_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cuenta,
            key: 'int_cuenta_id'
        }
    },
    dc_libro_mayor_debe: {
        type: DataTypes.DECIMAL
    },
    dc_libro_mayor_haber: {
        type: DataTypes.DECIMAL
    },
    dc_libro_mayor_saldo: {
        type: DataTypes.DECIMAL
    },
    int_cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'int_cliente_id'
        }
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});