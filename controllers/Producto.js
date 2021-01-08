const { Op } = require("sequelize");
const { Producto } = require("../config/Sequelize");
const { Usuario } = require("../config/Sequelize");
const { Categoria } = require("../config/Sequelize");

const obtenerProductos = (req, res) => {
  
  const myWhere = {};
  if('categoria' in req.query)
    myWhere['id_categoria'] = req.query.categoria;
  myWhere['estado'] = 1;

  const myOrder = [];
  if('order' in req.query && 'campo' in req.query)
    myOrder.push([req.query.campo, req.query.order]);
  
  if('busqueda' in req.query){
    myWhere['nombre'] = {};
    myWhere['nombre'][Op.like] = `%${req.query.busqueda}%`;
  }

  Producto.findAll({ 
    where: myWhere,
    order: myOrder
  })
    .then((resultado) => {
        res.status(200).json({
          ok: true,
          content: resultado,
          message: "Éxito.",
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
  producto
    .save()
    .then((resultado) => {
      return res.status(201).json({
        ok: true,
        content: resultado,
        message: "Producto creado exitosamente.",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrió un error al tratar de crear el producto.",
      });
    });
};

const actualizarProducto = (req, res) => {
  
  Producto.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((resultado) => {
      return res.status(200).json({
        ok: true,
        content: resultado,
        message: "Producto actualizado exitosamente.",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message:
          "Ocurrió un problema al tratar de actualizar el producto.",
      });
    });
    
};

const eliminarProducto = (req, res) => {
  Producto.findOne({ where: { id: req.params.id } }).then(
    (producto_encontrado) => {
      Producto.update(
        { estado: 0 },
        {
          where: {
            id: producto_encontrado.id,
          },
        }
      )
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Producto eliminado exitosamente",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrió un problema al tratar de eliminar el producto deseado",
          });
        });
    }
  ).catch((error) => {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "El producto que desea eliminar no existe.",
    });
  });
};

module.exports = {
  obtenerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
};
