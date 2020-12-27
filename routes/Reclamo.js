const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const ReclamoRutas = require("../controllers/Reclamo")
const reclamo_router = Router()

reclamo_router.get("/reclamos", ReclamoRutas.obtenerReclamos)
reclamo_router.post("/reclamos/reclamar", ReclamoRutas.insertarReclamo)

module.exports = {
    reclamo_router
}