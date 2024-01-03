const { tracksModel } = require("../models"); // exportamos el index que obtiene todos los modelos

// en los controllers es donde hare mi conexion a la bd, la logica de los metodos, etc
// procedemos a crear los metodos

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = (req, res) => {
  //const data = tracksModel.find({}); // aca seleccionamos toda la data del modelo tracks
  const data = ['hola', 'mundo'];
  res.send({ data });
};

/**
 * Obtener detalle de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 * Insertar un dato
 * @param {*} req
 * @param {*} res
 */
const createItem = async(req, res) => {
  console.log(res);  
  const {body} = req
  console.log(body);
  // const data = await tracksModel.create(body);
  res.send({algo:1});
};

/**
 * Actualizar un dato
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 * Eliminar un dato
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
