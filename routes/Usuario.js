const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const UsuarioRutas = require("../controllers/Usuario")
const usuario_router = Router()

usuario_router.get("/usuarios/:nombre", UsuarioRutas.BuscarUsuario)
usuario_router.get("/informacion/usuarios/:nombre", UsuarioRutas.BuscarUsuario)
usuario_router.get("/:nombre/opciones", UsuarioRutas.BuscarUsuario)
usuario_router.post("/iniciarsesion", UsuarioRutas.IniciarSesion)
usuario_router.post("/crearcuenta", UsuarioRutas.CrearCuenta)
usuario_router.put("/informacion/usuarios/:nombre",UsuarioRutas.ActualizarUsuario)
usuario_router.put("/informacion/usuarios/descripcion/:nombre",UsuarioRutas.ActualizarDescripcionUsuario)

module.exports = {
    usuario_router
}