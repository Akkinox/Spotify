// importamos a mongoose para hacer nuestro schema de usuario (Modelo)
const mongoose = require("mongoose");

const StorageScheme = new mongoose.Schema(
  // Aqui debemos dejar 2 bloques para usar
  // el primero llevara los atributos de nuestro modelo
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    }
  },
  // este apartado sirve para definir los atributos de medicion create_at, update_at
  {
    timestamps: true,
    versionKey: false
  }
);

// Aca lo que exportamos el modelo y entre comillas dejamos el nombre de la tabla
module.exports = mongoose.model("storage", StorageScheme);
