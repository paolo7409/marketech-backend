const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const CategoriaRutas = require("../controllers/Categoria")
const categoria_router = Router()

categoria_router.get("/categorias/obtener", CategoriaRutas.obtenerCategorias)
categoria_router.post("/categorias/insertar", CategoriaRutas.insertarCategoria)
categoria_router.put("/categorias/actualizar/:id", CategoriaRutas.actualizarCategoria)
categoria_router.delete("/categorias/eliminar/:id", CategoriaRutas.eliminarCategoria)

module.exports = {
    categoria_router
}