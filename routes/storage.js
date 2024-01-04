const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {validatorGetItem} = require("../validators/storageValidator");

const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage");
// http://localhost:3001/api/storage

/* 
    Lista de items
*/
router.get("/", getItems);
/* 
    Detalle de un item
*/
router.get("/:id", validatorGetItem, getItem);
/* 
    Eliminar un item
*/
router.delete("/:id", validatorGetItem, deleteItem);

/* 
    Crear un item
*/
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;
