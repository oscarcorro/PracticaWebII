const express = require("express") //framework servidores
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users") //funciones 

const router = express.Router();
//rutas: 
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router; 
