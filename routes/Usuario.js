const {Router} = require("express")
const UsuarioRutas = require("../controllers/Usuario")
const usuario_router = Router()

usuario_router.get("/usuarios/:nombre", UsuarioRutas.BuscarUsuario)
usuario_router.get("/informacion/usuarios/:nombre", UsuarioRutas.BuscarUsuario)
usuario_router.post("/iniciarsesion", UsuarioRutas.IniciarSesion)
usuario_router.post("/crearcuenta", UsuarioRutas.CrearCuenta)
usuario_router.put("/informacion/usuarios/:nombre", UsuarioRutas.ActualizarUsuario)

module.exports = {
    usuario_router
}