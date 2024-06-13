import app from "./app.js";
import { configVariables } from "./config/variablesGlobales.js";
import { sequelize } from "./database/database.js";
import { Usuario } from "./models/seguridad/usuario.model.js";
import { Cliente } from "./models/estadosFinancieros/cliente.models.js";
import { TipoCuenta } from "./models/estadosFinancieros/tipoCuentas.models.js";
import { Cuenta } from "./models/estadosFinancieros/cuentas.models.js";
import { TipoDetalle } from "./models/estadosFinancieros/tipoDetalle.models.js";
import { LibroDiario } from "./models/estadosFinancieros/libroDiario.models.js";
import { TipoTransaccion } from "./models/estadosFinancieros/tipoTransaccion.models.js";
import { LibroMayor } from "./models/estadosFinancieros/libroMayor.models.js";
import { DetalleDiario } from "./models/estadosFinancieros/detalleTransaccion.models.js";

import { createAdmin } from "./config/admin.js";
import { createClientes} from "./utils/clientes.js";
import { createTipoCuentas} from "./utils/clientes.js";
import { createCuentas} from "./utils/clientes.js";
import { createTipoDetalles} from "./utils/clientes.js";
import {createTipoTransacciones} from "./utils/clientes.js";




async function main(port) {
    try {
      // Conexión a la base de datos 
      await sequelize.authenticate();
  
      // Sincronización de la base de datos
      await sequelize.sync({ force: true, logging: false });
  
      const environment = configVariables.env === "production" ? "produccion" : "desarrollo";
      app.listen(port, () => {
        console.log(`Servidor ${environment} escuchando en el puerto ${port}`);
      });
      createAdmin();
      createClientes();
      createTipoCuentas();
      createCuentas();
      createTipoDetalles();
      createTipoTransacciones();
      
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
    }
  }
  
main(configVariables.port);