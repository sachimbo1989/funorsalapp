import app from "./app.js";
import { configVariables } from "./config/variablesGlobales.js";
import { sequelize } from "./database/database.js";


async function main(port) {
    try {
      // Conexión a la base de datos 
      await sequelize.authenticate();
  
      // Sincronización de la base de datos
      await sequelize.sync({ force: false, logging: false });
  
      const environment = configVariables.env === "production" ? "produccion" : "desarrollo";
      app.listen(port, () => {
        console.log(`Servidor ${environment} escuchando en el puerto ${port}`);
      });
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
    }
  }
  
main(configVariables.port);