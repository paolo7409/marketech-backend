const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const ComprasRutas = require("../controllers/Compra")
const compra_router = Router()

compra_router.post("/productos/:id/comprar", ComprasRutas.comprarProducto)
compra_router.post("/compra/procesar", ComprasRutas.procesar)
compra_router.get("/compra/success", ComprasRutas.success)
compra_router.get("/compra/pending", ComprasRutas.pending)
compra_router.get("/compra/failure", ComprasRutas.failure)
compra_router.post("/compra/notificaciones", ComprasRutas.notificaciones)

module.exports = {
    compra_router
}