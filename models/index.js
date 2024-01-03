// Aca lo que haremos es dividir un poco el tema de la bd
// para este caso usare bd no relacional pero tambien se hara con una relacional
// generamos un objeto de modelos e importamos sus modelos correspondientes

const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage'),
};

module.exports = models;