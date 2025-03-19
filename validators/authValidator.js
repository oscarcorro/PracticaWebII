//validación de los datos para registrarse e iniciar sesión
const { check } = require("express-validator") //middleware para validar los datos
const validateResults = require("../utils/handleValidator") //función para manejar errores de validación

const validatorRegister = [
    check("email").isEmail().withMessage("El email no es válido"), //email valido
    check("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"), //min 8 caracteres la pass
    validateResults //manejo de errores de validación
];

const validatorLogin = [
    check("email").isEmail().withMessage("El email no es válido"), //email valido
    check("password").exists().withMessage("La contraseña es obligatoria"), //hay contraseña
    validateResults //manejo de errores de validación
];

module.exports = { validatorRegister, validatorLogin };
