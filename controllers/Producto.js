const { Producto } = require("../config/Sequelize");

const obtenerProductos = (req, res) => {
  Producto.findAll({ where: { estado: 1 } })
    .then((resultado) => {
        res.status(200).json({
          ok: true,
          content: resultado,
          message: "Productos encontrados con éxito.",
        });

    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error.",
      });
    });
};

const insertarProducto = (req, res) => {
  let producto = Producto.build(req.body);
  producto.save().then((resultado) => {
    return res.status(201).json({
      ok: true,
      content: producto,
      message: "Producto creado exitosamente",
    });
  });
};

const actualizarProducto = (req, res) => {

  Producto.findOne({ where: { id: req.params.id } }).then(
    (producto_encontrado) => {
      Producto.update(req.body, {
        where: {
          id: producto_encontrado.id,
        },
      })
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Producto actualizado correctamente.",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrió un problema al tratar de actualizar el producto.",
          });
        });
    }
  );
};

const eliminarProducto = (req, res) => {

  Producto.findOne({ where: { id: req.params.id } }).then(
    (producto_encontrado) => {
      Producto.update({estado: 0}, {
        where: {
          id: producto_encontrado.id,
        },
      })
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Producto eliminado correctamente.",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrió un problema al tratar de eliminar el producto.",
          });
        });
    }
  );
};

module.exports = {
  obtenerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto
};
