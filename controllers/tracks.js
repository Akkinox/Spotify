const { matchedData } = require("express-validator");
const {handleHttpError} = require('../utils/handleError');
const { tracksModel } = require("../models"); // exportamos el index que obtiene todos los modelos

// en los controllers es donde hare mi conexion a la bd, la logica de los metodos, etc
// procedemos a crear los metodos

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.find({}).exec();
    res.json({ data, user});
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findById(id);
    res.send({ data });
  }catch(err){
    console.log(err);
    handleHttpError(res,"ERROR_GET_ITEM")
  }
};

/**
 * Insertar un dato
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
    /* 
    aca podemos ejecutar 2 cosas ver como funciona el matchedData
    const body = req;
    const bodyClean = matchedData(req);
    */
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

/**
 * Actualizar un dato
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req); 
    // al usar los 3 puntos decimos que id quedara en 1 array y el body en otro, osea los separamos
    const data = await tracksModel.findByIdAndUpdate(id, body); // cambie findOneAndUpdate por findByIdAndUpdate 
    res.send({ data });
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }

};

/**
 * Eliminar un dato
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.delete({_id:id}); // con deleteOne se borra de tajo xD
    res.send({ data });
  }catch(err){
    console.log(err);
    handleHttpError(res,"ERROR_DELETE_ITEM")
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
