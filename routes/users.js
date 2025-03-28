const express = require("express") //framework servidores
const { getUsers, getUser, updateUser, deleteUser, updateUserCompanyData } = require("../controllers/users") //funciones 
const { validatorPersonalData, validatorCompanyData } = require("../validators/userValidator");
const {authMiddleware} = require("../middleware/authMiddleware")
const {uploadMiddleware} = require("../middleware/uploadLogo")
const User = require("../models/nosql/user")



const router = express.Router();
//rutas: 
router.get("/", getUsers); //obtener todos los usuarios
router.get("/:id", getUser); //obtener usuario por id
router.put("/:id", authMiddleware, validatorPersonalData, updateUser); //modificar usuario por id
router.delete("/:id", deleteUser); //eliminar (soft) usuario por id

//Punto 4 PUT y PATCH
//Actualizar datos compañía con token
router.patch("/update-company", authMiddleware, validatorCompanyData, updateUserCompanyData);

//Punto 5: logo
router.patch("/update-logo", authMiddleware, uploadMiddleware.single("logo"), async (req, res) => {
    try{
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user) 
            return handleHttpError(res, "USER_NOT_FOUND", 404)

        user.logo = `/storage/${req.file.filename}` //guardar la ruta relativa en la BD
        await user.save()

        res.json({message: "Logo actualizado correctamente", logo: user.logo })
    }catch(error){
        console.error(error)
        handleHttpError(res, "ERROR_UPDATE_LOGO", 500)
    }
})


module.exports = router; 
