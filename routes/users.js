const express = require("express") //framework servidores
const { getUsers, getUser, updateUser, deleteUser, updateUserCompanyData } = require("../controllers/users") //funciones 
const { validatorPersonalData, validatorCompanyData } = require("../validators/userValidator");
const {authMiddleware} = require("../middleware/authMiddleware")


const router = express.Router();
//rutas: 
router.get("/", getUsers); //obtener todos los usuarios
router.get("/:id", getUser); //obtener usuario por id
router.put("/:id", authMiddleware, validatorPersonalData, updateUser); //modificar usuario por id
router.delete("/:id", deleteUser); //eliminar (soft) usuario por id

//Punto 4 PUT y PATCH
//Actualizar datos compañía con token
router.patch("/update-company", authMiddleware, validatorCompanyData, updateUserCompanyData);


module.exports = router; 
