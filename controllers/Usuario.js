const { Usuario } = require("../config/Sequelize");
const { Compra } = require("../config/Sequelize");
const { Producto } = require("../config/Sequelize");

const datosunicosdeusuario = {
  nombre: "",
  correo: "",
  telefono: "",
};

const CrearCuenta = (req, res) => {
  const MensajedeUsuarioRepetido = (datorepetido) => {
    res.status(400).json({
      ok: false,
      content: null,
      message: `el ${datorepetido} ingresado ya esta en uso`,
    });
  };

  const CrearUsuario = () => {
    let nuevoUsuario = Usuario.build(req.body);
    nuevoUsuario.encriptarContrasena(req.body.usuarioContrasena);
    nuevoUsuario.save().then((usuarioCreado) => {
      datosunicosdeusuario.nombre = req.body.usuarioNombre;
      datosunicosdeusuario.correo = req.body.usuarioCorreo;
      datosunicosdeusuario.telefono = req.body.usuarioTelefono;
      return res.status(201).json({
        ok: true,
        content: usuarioCreado,
        message: "Usuario creado exitosamente",
      });
    });
  };

  const MensajedeError = (error) => {
    res.status(500).json({
      ok: false,
      content: error,
      message: "Ocurrio un error al tratar de crear al usuario",
    });
  };

  const VerificadordeTelefonoRepetido = () => {
    Usuario.findOne({ where: { usuarioTelefono: req.body.usuarioTelefono } })
      .then((usuarioRepetido) => {
        if (usuarioRepetido) {
          MensajedeUsuarioRepetido("telefono");
        } else {
          CrearUsuario();
        }
      })
      .catch((error) => {
        MensajedeError(error);
      });
  };

  const VerificadordeCorreoRepetido = () => {
    Usuario.findOne({ where: { usuarioCorreo: req.body.usuarioCorreo } })
      .then((usuarioRepetido) => {
        if (usuarioRepetido) {
          MensajedeUsuarioRepetido("correo");
        } else {
          VerificadordeTelefonoRepetido();
        }
      })
      .catch((error) => {
        MensajedeError(error);
      });
  };

  Usuario.findOne({ where: { usuarioNombre: req.body.usuarioNombre } })
    .then((usuarioRepetido) => {
      if (usuarioRepetido) {
        MensajedeUsuarioRepetido("nombre");
      } else {
        VerificadordeCorreoRepetido();
      }
    })
    .catch((error) => {
      MensajedeError(error);
    });
};

const IniciarSesion = (req, res) => {
  Usuario.findOne({
    where: {
      usuarioNombre: req.body.usuarioNombre,
    },

    where: {
      usuarioCorreo: req.body.usuarioCorreo,
    },
  })
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        let usuarioValidado = usuarioEncontrado.validarContrasena(
          req.body.usuarioContrasena
        );
        console.log(usuarioValidado);
        if (usuarioValidado) {
          let token = usuarioEncontrado.generarJSONWebToken();
          console.log(token);
          res.status(200).json({
            ok: true,
            content: {
              usuario: usuarioEncontrado,
              token: token,
            },
            message: "Inicio de Sesion realizado exitosamente",
          });
        } else {
          res.status(404).json({
            ok: false,
            content: null,
            message: "Los datos ingresados son incorrectos",
          });
        }
      } else {
        res.status(404).json({
          ok: false,
          content: null,
          message: "Los datos ingresados son incorrectos",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        content: null,
        message: "Ocurrio un error al tratar de iniciar sesion",
      });
    });
};

const ActualizarUsuario = (req, res) => {
  const MensajedeUsuarioRepetido = (datorepetido) => {
    res.status(400).json({
      ok: false,
      content: null,
      message: `el ${datorepetido} ingresado ya esta en uso`,
    });
  };

  const ActualizaciondeUsuario = () => {
    Usuario.findOne({ where: { usuarioNombre: req.params.nombre } }).then(
      (usuarioEncontrado) => {
        Usuario.update(req.body, {
          where: {
            usuarioNombre: req.params.nombre,
          },
        })
          .then((usuarioActualizado) => {
            usuarioEncontrado.encriptarContrasena(req.body.usuarioContrasena);
            usuarioEncontrado.save().then(() => {
              return res.status(200).json({
                ok: true,
                content: usuarioActualizado,
                message: "Usuario actualizado exitosamente",
              });
            });
          })
          .catch((error) => {
            return res.status(500).json({
              ok: false,
              content: error,
              message: "Ocurrio un problema al tratar de actualizar al usuario",
            });
          });
      }
    );
  };

  const MensajedeError = (error) => {
    res.status(500).json({
      ok: false,
      content: error,
      message: "Ocurrio un error al tratar de crear al usuario",
    });
  };

  const VerificadordeTelefonoRepetido = () => {
    Usuario.findOne({ where: { usuarioTelefono: req.body.usuarioTelefono } })
      .then((usuarioRepetido) => {
        if (usuarioRepetido) {
          MensajedeUsuarioRepetido("telefono");
        } else {
          ActualizaciondeUsuario();
        }
      })
      .catch((error) => {
        MensajedeError(error);
      });
  };

  const VerificadordeCorreoRepetido = () => {
    Usuario.findOne({ where: { usuarioCorreo: req.body.usuarioCorreo } })
      .then((usuarioRepetido) => {
        if (usuarioRepetido) {
          MensajedeUsuarioRepetido("correo");
        } else {
          VerificadordeTelefonoRepetido();
        }
      })
      .catch((error) => {
        MensajedeError(error);
      });
  };

  Usuario.findOne({ where: { usuarioNombre: req.params.nombre } })
    .then((usuarioEncontrado) => {
      if (usuarioEncontrado) {
        Usuario.findOne({ where: { usuarioNombre: req.body.usuarioNombre } })
          .then((usuarioRepetido) => {
            if (usuarioRepetido) {
              MensajedeUsuarioRepetido("nombre");
            } else {
              VerificadordeCorreoRepetido();
            }
          })
          .catch((error) => {
            MensajedeError(error);
          });
      } else {
        return res.status(404).json({
          ok: false,
          content: null,
          message: "El usuario que se desea actualizar no existe",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un problema al tratar de actualizar al usuario",
      });
    });
};

const ActualizarDescripcionUsuario = (req, res) => {
  Usuario.findOne({ where: { usuarioNombre: req.params.nombre } }).then(
    (usuarioEncontrado) => {
      if (usuarioEncontrado) {
        Usuario.update(
          req.body ,
          { where: { usuarioNombre: req.params.nombre } }
        )
          .then((usuarioEncontrado) => {
            res.status(200).json({
              ok: true,
              content: usuarioEncontrado,
              message: "Descripcion actualizada exitosamente",
            });
          })
          .catch((error) => {
            console.log(error)
            res.status(500).json({
              ok: false,
              content: error,
              message:
                "Ocurrio un error al tratar de actualizar la descripcion del usuario",
            });
          });
      } else {
        res.status(404).json({
          ok: false,
          content: null,
          message: "El usuario que se desea actualizar no se encontro",
        });
      }
    }
  ).catch((error) => {
    console.log(error)
    res.status(500).json({
      ok: false,
      content: error,
      message:
        "Ocurrio un error al tratar de actualizar la descripcion del usuario",
    });
  })
};

const BuscarUsuario = (req, res) => {

  const ObtenerUsuarioBuscado = (productoscomprados, productosvendidos, productosenventa) => {
    Usuario.findOne({ where: { usuarioNombre: req.params.nombre } })
      .then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          res.status(200).json({
            ok: true,
            content: {
              usuario: usuarioEncontrado,
              productoscomprados : productoscomprados,
              productosvendidos : productosvendidos,
              productosenventa : productosenventa
            },
            message: "Usuario encontrado exitosamente",
          });
        } else {
          res.status(404).json({
            ok: false,
            content: null,
            message: "El usuario que se desea encontrar no existe ",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de encontrar el usuario deseado",
        });
      });
  };

  const ObtenerProductosUsuario = (usuarioId) => {
    const ObtenerProductosComprados = new Promise((resolve, reject) => {
      let productoscomprados;
  
      Compra.findAll({ where: { id_usuario: usuarioId } })
        .then((productosEncontrados) => {
          if (productosEncontrados) {
            let productoscompradosobtenidos = [];
            productosEncontrados.forEach((producto) =>
              productoscompradosobtenidos.push(producto.dataValues)
            );
            productoscomprados = productoscompradosobtenidos;
  
            resolve(productoscomprados)
  
          } else {
            resolve("por el momento el usuario no tiene productos comprados")
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error)
          res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrio un error al tratar de encontrar el usuario deseado",
          });
        });
    });
  
    const ObtenerProductosVendidos = new Promise ((resolve, reject) => {
      let productosvendidos;
  
      Producto.findAll({ where: { id_usuario: usuarioId } })
        .then((productosEncontrados) => {
          if (productosEncontrados) {
            let productosvendidosbtenidos = [];
            productosEncontrados.forEach((producto) =>
              productosvendidosbtenidos.push(producto.dataValues)
            );
            let productosvendidosfiltrados = productosvendidosbtenidos.filter(
              (producto) => producto.stock === 0
            );
            productosvendidos = productosvendidosfiltrados;
  
            resolve(productosvendidos)
  
          } else {
            resolve("por el momento el usuario no tiene productos vendidos")
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error)
          res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrio un error al tratar de encontrar el usuario deseado",
          });
        });
    });
  
    const ObtenerProductosenVenta = new Promise ((resolve, reject) => {
      let productosenventa;
  
      Producto.findAll({ where: { id_usuario: usuarioId } })
        .then((productosEncontrados) => {
          if (productosEncontrados) {
            let productosenventaobtenidos = [];
            productosEncontrados.forEach((producto) =>
              productosenventaobtenidos.push(producto.dataValues)
            );
            let productosenventafiltrados = productosenventaobtenidos.filter(
              (producto) => producto.stock > 0
            );
            productosenventa = productosenventafiltrados;
  
            resolve(productosenventa)
  
          } else {
            resolve("por el momento el usuario no tiene productos en venta")
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error)
          res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrio un error al tratar de encontrar el usuario deseado",
          });
        });
    });
  
    ObtenerProductosComprados.then((productoscomprados) => {
      ObtenerProductosVendidos.then((productosvendidos) => {
        ObtenerProductosenVenta.then((productosenventa) => {
          ObtenerUsuarioBuscado(productoscomprados, productosvendidos, productosenventa);
        }).catch((error) => {
          res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrio un error al tratar de encontrar el usuario deseado",
          });
    })
      }).catch((error) => {
        res.status(500).json({
          ok: false,
          content: error,
          message: "Ocurrio un error al tratar de encontrar el usuario deseado",
        });
    })
    }).catch((error) => {
      res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrio un error al tratar de encontrar el usuario deseado",
      });
    })
  }
  Usuario.findOne({ where: { usuarioNombre: req.params.nombre } })
  .then((usuarioEncontrado) => {
    if (usuarioEncontrado) {
      ObtenerProductosUsuario(usuarioEncontrado.idUsuario)
    } else {
      res.status(404).json({
        ok: false,
        content: null,
        message: "El usuario que se desea encontrar no existe ",
      });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      ok: false,
      content: error,
      message: "Ocurrio un error al tratar de encontrar el usuario deseado",
    });
  });
};

module.exports = {
  CrearCuenta,
  IniciarSesion,
  ActualizarUsuario,
  ActualizarDescripcionUsuario,
  BuscarUsuario,
};
