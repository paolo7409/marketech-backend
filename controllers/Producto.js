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

module.exports = {
  obtenerProductos,
  insertarProducto
};
