//Controlador que tiene los endpoints de registro y login
const {matchedData} = require("express-validator") //datos validados
const {encrypt, compare} = require("../utils/handlePassword") //funciones para cifrar y comparar la contraaesña
const {tokenSign} = require("../utils/handleJwt") //función para firmar y generar el token
const User = require("../models/nosql/user") //modelo del usuario en mongoDB
const {handleHttpError} = require("../utils/handleError") //manejo de errores

//Controlador para registrar un nuevo usuario
const registerCtrl = async(req, res) => {
    try {
        req = matchedData(req) //extraemos solo los datos validados
        //verificamos si el email ya existe en la BD
        const existingUser = await User.findOne({email: req.email})
        if(existingUser){
            return handleHttpError(res, "EMAIL_ALREADY_EXISTS", 409)
        }

        const password = await encrypt(req.password) //ciframos la pass
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //codigo de verifiacion aleatorio de 6 digitos
        //creamos un nuevo usuario
        const newUser = await User.create({
            ...req,
            password,
            verificationCode,
            status: "pending"
        })

        newUser.set("password", undefined, {strict: false}) //no mostrar la contraseña
        //respuesta con el token y el usuario nuevo
        const data = {
            token: await tokenSign(newUser),
            user: newUser
        }

        res.send(data) //enviamos token y user
    } catch(error) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

//función para iniciar sesión
const loginCtrl = async(req, res) => {
    try {
        req = matchedData(req) //datos validados
        const user = await User.findOne({email: req.email}).select("+password") //busacamos el user y obtenemos la pass
    
        if(!user){ //si el user no existe
            return handleHttpError(res, "USER_NOT_FOUND", 404)
        }
        //comparamos la pass
        const checkPassword = await compare(req.password, user.password)
        if(!checkPassword){
            return handleHttpError(res, "INVALID_PASSWORD", 401)
        }

        user.set("password", undefined, {strict: false}) //no mostrar la contraseña
        //generamos un token nuevo
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data) //enviamos token e info del user
    } catch(error) {
        console.log(error)
        handleHttpError(res, "ERROR_LOGIN_USER", 500)
    }
}

module.exports = {registerCtrl, loginCtrl}