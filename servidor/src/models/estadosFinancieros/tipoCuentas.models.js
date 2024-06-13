import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const TipoCuenta = sequelize.define('tipo_cuenta', {
    int_tipo_cuenta_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_tipo_cuenta_nombre: {
        type: DataTypes.STRING
    },
    str_tipo_cuenta_descripcion: {
        type: DataTypes.STRING
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});