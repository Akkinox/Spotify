const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem } = require("../controllers/tracks")

//Aca generaremos todo lo que es las rutas de acceso
// http://locahost/tracks GET, POST, DELETE, PUT

router.get('/', getItems);
router.post('/', createItem);


module.exports = router;