// importamos el paquete de mongoose para hacer la conexion a la bd
const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI
  );

  // Manejadores de eventos de conexión
  mongoose.connection.on('connected', () => {
    console.log('**** CONEXION EXITOSA ****');
  });

  mongoose.connection.on('error', (err) => {
    console.log('**** CONEXION FALLIDA ****');
    console.error('Error de conexión a MongoDB:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('**** CONEXION CERRADA ****');
  });

  // Cierra la conexión a MongoDB cuando se termina el proceso de Node.js
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  });
};

// exportamos nuestra función para utilizarla en cualquier sitio de la app
module.exports = dbConnect;
