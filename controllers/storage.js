const fs = require("fs");
const { storageModel } = require("../models");
const { matchedData } = require("express-validator");
const {handleHttpError} = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL; // aca obtenemos las url luego de hacerlas publica para acceder a los mediafile
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({}).exec();
    res.json({ data });
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_LIST_ITEMS");
  }
};

/**
 * Obtener detalle de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try{
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  }catch(err){
    console.log(err)
    handleHttpError(res, "ERROR_DETAIL_ITEM");
  }

};

/**
 * Insertar un dato
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { body, file } = req;
  console.log(file);
  const fileData = {
    filename: file.filename, 
    url: `${PUBLIC_URL}/${file.filename}`
  }
  const data = await storageModel.create(fileData);
  res.send({ data });
};

/**
 * Eliminar un dato
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try{
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.delete({_id:id}); // con este comando hacemos el softdelete
    const {filename} = dataFile; // Con este comando buscamos el nombre del archivo
    const filePath = `${MEDIA_PATH}/${filename}` // con este comando hacemos la ruta absoluta c:/user/blabla/cdkjakd.jpg
    /*/fs.unlinkSync(filePath); */// Con este comando eliminamos los archivos guardados en el proyecto
    const data = {filePath, deleted:1};
    res.send({ data });
  }catch(err){
    console.log(err)
    handleHttpError(res, "ERROR_DETAIL_ITEM");
  }

};

module.exports = { getItems, getItem, createItem, deleteItem };
