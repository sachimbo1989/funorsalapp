import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';


export const TipoDetalle = sequelize.define('tipo_detalle', {
    int_tipo_detalle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    str_tipo_detalle_nombre: {
        type: DataTypes.STRING
    },
    str_tipo_detalle_descripcion: {
        type: DataTypes.STRING
    }
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});