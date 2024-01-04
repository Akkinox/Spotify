const express = require("express");
const router = express.Router();
const {validatorLogin, validatorRegister} = require("../validators/authValidator");
const { register, login } = require("../controllers/auth");

/* 
    Crear un item
*/
router.post("/login", validatorLogin, login);
router.post("/register", validatorRegister, register);

module.exports = router;