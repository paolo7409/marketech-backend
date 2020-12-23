const {Categoria, Producto} = require("../config/Sequelize")

const obtenerCategorias = (req, res) => {
    Categoria.findAll().then((categorias) => {
        if(categorias.length === 0) {
            res.status(404).json({
                ok : false,
                content : categorias,
                message : "Por el momento no hay categorias registradas"           
            })
        }

        else {
            res.status(200).json({
                ok : true,
                content : categorias,
                message : "Categorias obtenidas exitosamente"           
            })
        }
    }).catch((error) => {
        res.status(500).json({
          ok: false,
          content: error,
          message:
            "Ocurrio un error al tratar de obtener las categorias deseadas",
        });
      });
}

const obtenerProductosdeCategoria = (req, res) => {
  
    const verificarEstado = () => {
      Producto.findAll({ where: { estado: 1 } })
        .then((resultado) => {
          let productosenventa = "";
          productosenventa = resultado.filter((producto) => producto.stock >= 1);
  
          res.status(200).json({
            ok: true,
            content: productosenventa,
            message: "Productos encontrados con éxito",
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
  
    const verificarCategoria = () => {
      Categoria.findOne({ where: { nombre: req.params.nombre } })
        .then((resultado) => {
          if (resultado) {
            verificarEstado();
          } else {
            res.status(404).json({
              ok: false,
              content: null,
              message:
                "La categoria de la cual se desean obtener sus productos no existe",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            ok: false,
            content: error,
            message:
              "Ocurrio un error al tratar de obtener los productos de la categoria buscada",
          });
        });
    };
  
    verificarCategoria();
  };

module.exports = {
    obtenerCategorias,
    obtenerProductosdeCategoria
}