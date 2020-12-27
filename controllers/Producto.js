const { Producto } = require("../config/Sequelize");
const { Usuario } = require("../config/Sequelize");
const { Categoria } = require("../config/Sequelize");

const ObtenerProductosparaHome = (req, res) => {

  const ObtenerProductosdeTecnologia = () => {
    let productosdetecnologia
    Producto.findAll({ where : { id_categoria : 1 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodetecnologia1 = productosEncontrados[0]
        let productodetecnologia2 = productosEncontrados[1]
        let productodetecnologia3 = productosEncontrados[2]
        let productodetecnologia4 = productosEncontrados[3]

        productosdetecnologia = [productodetecnologia1, productodetecnologia2, productodetecnologia3, productodetecnologia4]

        return productosdetecnologia
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeEntretenimiento = () => {
    let productosdeentretenimiento
    Producto.findAll({ where : { id_categoria : 2 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodeentretenimiento1 = productosEncontrados[0]
        let productodeentretenimiento2 = productosEncontrados[1]
        let productodeentretenimiento3 = productosEncontrados[2]
        let productodeentretenimiento4 = productosEncontrados[3]

        productosdeentretenimiento = [productodeentretenimiento1, productodeentretenimiento2, productodeentretenimiento3, productodeentretenimiento4]

        return productosdeentretenimiento
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeDeporte = () => {
    let productosdedeporte
    Producto.findAll({ where : { id_categoria : 3 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodedeporte1 = productosEncontrados[0]
        let productodedeporte2 = productosEncontrados[1]
        let productodedeprote3 = productosEncontrados[2]
        let productodeceporte4 = productosEncontrados[3]

        productosdedeporte = [productodedeporte1, productodedeporte2, productodedeprote3, productodeceporte4]

        return productosdedeporte
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeRopa = () => {
    let productosderopa
    Producto.findAll({ where : { id_categoria : 4 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productoderopa1 = productosEncontrados[0]
        let productoderopa2 = productosEncontrados[1]
        let productoderopa3 = productosEncontrados[2]
        let productoderopa4 = productosEncontrados[3]

        productosderopa = [productoderopa1, productoderopa2, productoderopa3, productoderopa4]

        return productosderopa
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeMuebles = () => {
    let productosdemuebles
    Producto.findAll({ where : { id_categoria : 5 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodemuebles1 = productosEncontrados[0]
        let productodemuebles2 = productosEncontrados[1]
        let productodemuebles3 = productosEncontrados[2]
        let productodemuebles4 = productosEncontrados[3]

        productosdemuebles = [productodemuebles1, productodemuebles2, productodemuebles3, productodemuebles4]

        return productosdemuebles
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeAutos = () => {
    let productosdeautos
    Producto.findAll({ where : { id_categoria : 6 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodeautos1 = productosEncontrados[0]
        let productodeautos2 = productosEncontrados[1]
        let productodeautos3 = productosEncontrados[2]
        let productodeautos4 = productosEncontrados[3]

        productosdeautos = [productodeautos1, productodeautos2, productodeautos3, productodeautos4]

        return productosdeautos
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  const ObtenerProductosdeLibros = () => {
    let productosdelibros
    Producto.findAll({ where : { id_categoria : 7 }}).then((productosEncontrados) => {

      if(productosEncontrados.length === 0){
        return false
      }

      else {

        let productodelibros1 = productosEncontrados[0]
        let productodelibros2 = productosEncontrados[1]
        let productodelibros3 = productosEncontrados[2]
        let productodelibros4 = productosEncontrados[3]

        productosdelibros = [productodelibros1, productodelibros2, productodelibros3, productodelibros4]

        return productosdelibros
      }
    }).catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos de la categoria buscada",
      });
    })
  }

  Producto.findAll().then((productosEncontrados) => {
    if (productosEncontrados.length === 0){
      res.status(404).json({
        ok: false,
        content: null,
        message: "Ocurrio un error al tratar de encontrar los productos nuevos buscados",
      });
    }

    else {
      let productonuevo1 = productosEncontrados[0]
      let productonuevo2 = productosEncontrados[1]
      let productonuevo3 = productosEncontrados[2]
      let productonuevo4 = productosEncontrados[3]

      let productosnuevos = [productonuevo1, productonuevo2, productonuevo3, productonuevo4]

      res.status(200).json({
        ok : true,
        content : {
          productosnuevos : productosnuevos,
          productosdetecnologia : "",
          productosdeentretenimiento : "",
          productosdedeporte : "",
          productosderopa : "",
          productosdemuebles : "",
          productosdeautos : "",
          productosdelibros : ""
        },
        message : "Productos del Home obtenidos exitosamenete"
      })
    }
  }).catch((error) => {
    res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar los productos nuevos buscados",
      });
    })
}

const insertarProducto = (req, res) => {

  const CrearProducto = () => {
    let producto = Producto.build(req.body);
    producto
      .save()
      .then((resultado) => {
        return res.status(201).json({
          ok: true,
          content: resultado,
          message: "Producto creado exitosamente",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  const ValidarNombre = () => {
    Producto.findOne({ where: { nombre: req.body.nombre } })
      .then((productoEncontrado) => {
        if (productoEncontrado) {
          res.status(400).json({
            ok: false,
            content: null,
            message: "el nombre ingresado ya esta en uso",
          });
        } else {
          CrearProducto()
        }
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  const ValidarCategoria = () => {
    Categoria.findByPk(req.body.id_categoria)
      .then((categoriaEncontrada) => {
        if (categoriaEncontrada) {
          ValidarNombre();
        } else {
          return res.status(404).json({
            ok: false,
            content: null,
            message: "la categoria no existe",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de crear el producto",
        });
      });
  };

  Usuario.findByPk(req.body.id_usuario)
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        ValidarCategoria();
      } else {
        return res.status(404).json({
          ok: false,
          content: null,
          message: "el usuario no existe",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de crear el producto",
      });
    });
};

const actualizarProducto = (req, res) => {
  
  const ValidarNombreRepetido = () => {
    Producto.findOne({ where: { nombre: req.body.nombre } })
      .then((productoEncontrado) => {
        if (productoEncontrado) {
          return res.status(400).json({
            ok: true,
            content: null,
            message: "el nombre ingresado ya esta en uso",
          });
        } else {
          Producto.findByPk(req.params.id).then((producto_encontrado) => {
            Producto.update(req.body, {
              where: {
                id: producto_encontrado.id,
              },
            })
              .then((resultado) => {
                return res.status(200).json({
                  ok: true,
                  content: resultado,
                  message: "Producto actualizado exitosamente",
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  ok: false,
                  content: error,
                  message:
                    "Ocurrió un problema al tratar de actualizar el producto",
                });
              });
          });
        }
      }).catch((error) => {
        return res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrió un problema al tratar de actualizar el producto",
        });
      });
  };

  Producto.findByPk(req.params.id).then((productoEncontrado) => {
    if (productoEncontrado){
      ValidarNombreRepetido();
    }

    else{
      res.status(404).json({
        ok : false,
        content : null,
        message : "El producto que se desea actualizar no existe"
      })
    }

  }).catch((error) => {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "Ocurrió un problema al tratar de actualizar el producto",
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
  );
};

module.exports = {
  ObtenerProductosparaHome,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
};
