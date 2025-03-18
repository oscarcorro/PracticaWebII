//Servidor básico utilizando express y cors
const express = require('express') //framework que facilita la creación de servidores
const cors = require('cors') //middleware que permite solicitudes externas
require('dotenv').config()

const dbConnect = require("./config/mongo") //importamos la función que conecta con la BD

const app = express() //instancia de express
app.use(cors()) //usa cors para permitir solicitudes externas
app.use(express.json()) //parsear JSON en las solicitudes

dbConnect() //conexión a la BD

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor express escuchando en el puerto: " + PORT)
})