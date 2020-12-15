const {Router} = require("express")
const UsuarioRutas = require("../controllers/Usuario")
const usuario_router = Router()

usuario_router.post("/crearcuenta", UsuarioRutas.CrearCuenta)

module.exports = {
    usuario_router
}