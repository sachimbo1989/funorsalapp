import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { TipoTransaccion } from './tipoTransaccion.models.js';
import { Cliente } from './cliente.models.js';

//llamaremos a la tabla Transaccion

export const LibroDiario = sequelize.define('libro_diario', {
    int_libro_diario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dt_libro_diario_fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    int_tipo_transaccion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoTransaccion,
            key: 'int_tipo_transaccion_id'
        }
    },
    int_cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'int_cliente_id'
        }
    },
    str_libro_diario_descripcion: {
        type: DataTypes.STRING
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});

