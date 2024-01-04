const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL; // aca obtenemos las url luego de hacerlas publica para acceder a los mediafile
/**
 * Obtener lista de la base de datos!
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({}).exec();
    res.json({ data });
  } catch (error) {
    console.error("Error en getItems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
