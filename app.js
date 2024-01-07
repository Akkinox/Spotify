// para llamar a nuestras variables de entorno llamamos a la libreria dotenv
require("dotenv").config()
// declaramos la librerias que usaremos
const express = require("express")
// express es la libreria que no permite levantar un servidor web o servicio web
const cors = require("cors")
// Agragamos el nuevo paquete de morgan-body
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");

// agregamos configuracion de swagger ui
const swaggerUI = require("swagger-ui-express")
const openApiConfigration = require("./docs/swagger")

// definimos el motor de base de datos
const ENGINE_DB = process.env.ENGINE_DB;


// llamado a la funcion de conexion de bd
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMySql} = require('./config/mysql');

const app = express()

app.use(cors())
// aca le estamos diciendo a la app que ocupe cors que es como un plugin para nuestra app
// cors ayuda arreglar el problema de el cruce de data entre la web y la app

//aca debemos poner la sentencia que hace que podamos hacer un post, esto quiere decir
// hace que funcione el express 
app.use(express.json());
app.use(express.static("storage")); // le estamos diciendo a express que ocupe los recursos de storage y los haga publico

// haremos que morgan empiece a funcionar
morganBody(app,{
    nocolors:true,
    stream:loggerStream,
    skip: function(req, res){
        return res.statusCode < 400;
    }
})


const port = process.env.PORT || 3000
// de esta forma llamamos a las variables de entorno con process.env.PORT
//const port = 3000
// aca definimos el puerto (proximamente se cambiara a la variables de entorno)

// creamos el apartado del server para swagger ui
app.use('/documentation',
 swaggerUI.serve, 
 swaggerUI.setup(openApiConfigration))

/**
 * Aqui invocamos a las rutas! 😎
 *  
 */  
app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('Tu app esta corriendo en http://localhost:'+port)
})

ENGINE_DB === 'nosql' ? dbConnectNoSql() : dbConnectMySql();
