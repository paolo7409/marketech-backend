const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const CategoriaRutas = require("../controllers/Categoria")
const categoria_router = Router()

categoria_router.get("/:nombre/productos", CategoriaRutas.obtenerProductosdeCategoria)
categoria_router.get("/categorias/obtener", CategoriaRutas.obtenerCategorias)

module.exports = {
    categoria_router
}