const express = require("express")
const bodyParser = require("body-parser")
const {conexion} = require("./Sequelize")
const {usuario_router} = require("../routes/Usuario")

class Server{
    constructor(){
        this.app = express()
        this.puerto = process.env.PORT || 5000
        this.habilitarCORS()
        this.configurarBodyParser()
        this.rutas()
    }

    habilitarCORS(){
        this.app.use((req,res, next) => {
            res.header("Access-Control-Allow-Origins", "*")
            res.header("Access-Control-Allow-Headers", "Authorization", "Content-Type", "Access-Content-Type", "Accept")
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
            next()
        })
    }

    configurarBodyParser(){
        this.app.use(bodyParser.json())
    }

    rutas(){
        this.app.get("/",(req,res) => {
            res.send("El servidor de Marketech esta funcionando exitosamente")
        })
        this.app.use("",usuario_router)
    }

    iniciarServidor(){
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`)
        })

        conexion.sync({force:false, alter:true}).then(()=>{
            console.log('Base de datos sincronizada correctamente');
        })
    }
}

module.exports = Server