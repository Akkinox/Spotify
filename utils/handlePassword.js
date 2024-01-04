const bcryptjs = require("bcryptjs")


/* 
    Contaseña sin encriptar: test123
*/
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    // con este comando hashearemos la contraseña
    return hash;
}

/* 
    Pasar contraseña sin encriptar y pasar contraseña encriptada
*/
const compare = async (passwordPlain, hash) => {
    return await bcryptjs.compare(passwordPlain, hash);

}

module.exports = {encrypt, compare}