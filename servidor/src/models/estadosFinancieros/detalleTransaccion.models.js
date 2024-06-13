import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { LibroDiario} from './libroDiario.models.js';
import { Cuenta } from './cuentas.models.js';
import { TipoDetalle } from './tipoDetalle.models.js';

export const DetalleDiario = sequelize .define('detalle_libro_diario', {
    int_detalle_libro_diario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    int_transaccion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: LibroDiario,
            key: 'int_libro_diario_id'
        }
    },
    int_cuenta_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cuenta,
            key: 'int_cuenta_id'
        }
    },
    int_tipo_detalle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDetalle,
            key: 'int_tipo_detalle_id'
        }
    },
    dc_detalle_transaccion_cantidad: {
        type: DataTypes.DECIMAL
    },
}, {
    schema: 'estados_financieros',
    timestamps: false,
    freezeTableName: true,
});    
    