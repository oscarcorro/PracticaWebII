//Este middleware extrae el token JWT del header, lo verifica y almacena la infor del usuario
const {verifyToken} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] //extraemos el token del header

        if(!token)
            return handleHttpError(res, "TOKEN_REQUIRED", 401)

        const decoded = verifyToken(token) //verificamos si el token es correcto
        if(!decoded)
            return handleHttpError(res, "INVALID_TOKEN", 401)

        req.user = decoded //guardamos la info
        next() //siguiente middleware/controlador
    }catch(error){
        handleHttpError(res, "AUTH_ERROR", 401)
    }
}

module.exports = {authMiddleware}