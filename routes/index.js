const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = __dirname;

// Aca haremos una funcion que haga que elimine la extension de los archivos
// ejemplo: tracks.js == [tracks.js]
// Split lo que hace es crear un array de acuerdo al valor que le damos en el parametro
// para que lo elimine

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)  // puede que entre index, storage, tracks, users
    // validamos que no salga index
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`)); // Aqui lo que hacemos es usar el router para que la url quede asi
                                                      // http://locahost:3001/api/tracks
    }
});


module.exports = router;