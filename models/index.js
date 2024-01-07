// Aca lo que haremos es dividir un poco el tema de la bd
// para este caso usare bd no relacional pero tambien se hara con una relacional
// generamos un objeto de modelos e importamos sus modelos correspondientes

const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${pathModels}/users`),
  tracksModel: require(`${pathModels}/tracks`),
  storageModel: require(`${pathModels}/storage`),
};

module.exports = models;