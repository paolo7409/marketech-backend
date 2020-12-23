const {Router} = require("express")
const {inspeccionador} = require("../utils/Validador")
const ProductoRutas = require("../controllers/Producto")
const producto_router = Router()

producto_router.get("/:nombre/productos", ProductoRutas.obtenerProductosdeCategoria)
producto_router.post("/productos/insertar", ProductoRutas.insertarProducto)
producto_router.put("/productos/actualizar/:id", ProductoRutas.actualizarProducto)
producto_router.delete("/productos/eliminar/:id", ProductoRutas.eliminarProducto)

module.exports = {
    producto_router
}