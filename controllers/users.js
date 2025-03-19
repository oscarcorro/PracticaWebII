const { handleHttpError } = require("../utils/handleError") //manejo de errores
const User = require("../models/nosql/user") //modelo de un usuario en la BD

//función para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); //busca todos los usuarios de la base de datos
        res.send(users); //mandamos la respuesta con todos los user
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS", 500);
    }
};
//función para obtener un usuario a través del id
const getUser = async (req, res) => {
    try {
        const { id } = req.params //obtiene el id de los parametros
        const user = await User.findById(id) //busca por id
        if (!user) return handleHttpError(res, "USER_NOT_FOUND", 404) //si no hay user...
        res.json(user) //devuelve la info del usuario
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USER", 500);
    }
};
//función para actualizar la info de un user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; //obtenemos id de params
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }); //buscamos y actualizamos 
        if (!updatedUser) return handleHttpError(res, "USER_NOT_FOUND", 404); //si no existe user..
        res.json(updatedUser); //devolvemos la info del usuario
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_USER", 500);
    }
};
//función para eliminar un usuario (soft-delete de mongoose)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; //obtenemos id de params
        const deletedUser = await User.findByIdAndDelete(id); //buscamos y eliminamos
        if (!deletedUser) return handleHttpError(res, "USER_NOT_FOUND", 404); //si no hay user...
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_USER", 500);
    }
};

module.exports = { getUsers, getUser, updateUser, deleteUser }; //exportamos todas las funciones
