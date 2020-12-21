const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const ReclamoRutas = require("../controllers/Reclamo")
const reclamo_router = Router()

reclamo_router.get("/reclamos", ReclamoRutas.obtenerReclamo)
reclamo_router.post("/reclamoss", ReclamoRutas.obtenerReclamo)

module.exports = {
    reclamo_router
}