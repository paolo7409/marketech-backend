const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const ComprasRutas = require("../controllers/Compra")
const compra_router = Router()

compra_router.post("/productos/:id/comprar", ComprasRutas.comprarProducto)

module.exports = {
    compra_router
}