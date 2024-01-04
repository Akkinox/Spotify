const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`; // aca lo que hacemos es obtener el directorio storage
    cb(null, pathStorage); // aca en cb retornamos la funcion con el path de storage
  },
  filename: function (req, file, cb) {
    // aca en esta funcion lo que haremos es obtener ese archivo que manda el usuario
    const ext = file.originalname.split(".").pop(); // devuelve el ["name", "png"] / el pop() es como el shift pero agarra lo ultimo del array
    const filename = `file-${Date.now()}.${ext}`; // Esto retornara un archivo llamado file-231928391.png/mp4/mp3
    cb(null, filename);
  },
});

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware