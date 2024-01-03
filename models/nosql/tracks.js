// importamos a mongoose para hacer nuestro schema de usuario (Modelo)
const mongoose = require("mongoose");

const TracksScheme = new mongoose.Schema(
  // Aqui debemos dejar 2 bloques para usar
  // el primero llevara los atributos de nuestro modelo
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: (req) => {
        return true;
      },
      message: "ERROR_URL",
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId:{
        type: String
    }
  },
  // este apartado sirve para definir los atributos de medicion create_at, update_at
  {
    timestamps: true,
    versionKey: false,
  }
);

// Aca lo que exportamos el modelo y entre comillas dejamos el nombre de la tabla
module.exports = mongoose.model("tracks", TracksScheme);
