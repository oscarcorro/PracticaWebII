const express = require("express"); //framework para crear servidores
const { registerCtrl, loginCtrl } = require("../controllers/auth"); //funciones para regsitrar e inicio de sesion
const { validatorRegister, validatorLogin } = require("../validators/authValidator"); //funciones para validar los datos (email y pass)

const router = express.Router();
//rutas
router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
