// para llamar a nuestras variables de entorno llamamos a la libreria dotenv
require("dotenv").config()
// declaramos la librerias que usaremos
const express = require("express")
// express es la libreria que no permite levantar un servidor web o servicio web
const cors = require("cors")

// llamado a la funcion de conexion de bd
const dbConnect = require('./config/mongo');

const app = express()

app.use(cors())
// aca le estamos diciendo a la app que ocupe cors que es como un plugin para nuestra app
// cors ayuda arreglar el problema de el cruce de data entre la web y la app

//aca debemos poner la sentencia que hace que podamos hacer un post, esto quiere decir
// hace que funcione el express 
app.use(express.json());
app.use(express.static("storage")); // le estamos diciendo a express que ocupe los recursos de storage y los haga publico

const port = process.env.PORT || 3000
// de esta forma llamamos a las variables de entorno con process.env.PORT
//const port = 3000
// aca definimos el puerto (proximamente se cambiara a la variables de entorno)

/**
 * Aqui invocamos a las rutas! 😎
 *  
 */  
app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log('Tu app esta corriendo en http://localhost:'+port)
})

dbConnect();