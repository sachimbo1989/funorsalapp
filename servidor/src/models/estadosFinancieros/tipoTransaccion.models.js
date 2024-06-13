import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const TipoTransaccion = sequelize.define('tipo_transaccion', {
    int_tipo_transaccion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_tipo_transaccion_nombre: {
        type: DataTypes.STRING
    },
    str_tipo_transaccion_descripcion: {
        type: DataTypes.STRING
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});