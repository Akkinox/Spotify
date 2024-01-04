const {encrypt, compare} = require("../utils/handlePassword");
const { matchedData } = require("express-validator");
const {usersModel } = require("../models");
const {tokenSign, verifyToken } = require("../utils/handleJWT");
const {handleHttpError} = require("../utils/handleError")

/* 
    Este controller es el encargado de registrar usuarios
*/
const register = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, {strict:false});
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
    
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
    
}

/* 
    Este controller es el encargado de logear al usuario
*/
const login = async (req, res) => {
    try{
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email}).select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }

        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});

    }catch(e){
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = {register, login}
