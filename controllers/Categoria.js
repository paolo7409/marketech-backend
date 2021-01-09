const {Categoria} = require("../config/Sequelize")

const obtenerCategorias = (req, res) => {
    Categoria.findAll({ 
      where: {estado: 1}
    }).then((categorias) => {
        if(categorias.length === 0) {
            res.status(404).json({
                ok : false,
                content : categorias,
                message : "Por el momento no hay categorias registradas."           
            })
        }

        else {
            res.status(200).json({
                ok : true,
                content : categorias,
                message : "Categorias obtenidas exitosamente."           
            })
        }
    }).catch((error) => {
        res.status(500).json({
          ok: false,
          content: error,
          message:
            "Ocurrio un error al tratar de obtener las categorias deseadas.",
        });
      });
}

const insertarCategoria = (req, res) => {
  let categoria = Categoria.build(req.body);
  categoria
    .save()
    .then((resultado) => {
      return res.status(201).json({
        ok: true,
        content: resultado,
        message: "Categoria creada exitosamente.",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "Ocurrió un error al tratar de crear la categoría.",
      });
    });
};

const actualizarCategoria = (req, res) => {
  
  Categoria.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((resultado) => {
      return res.status(200).json({
        ok: true,
        content: resultado,
        message: "Categoría actualizada exitosamente.",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message:
          "Ocurrió un problema al tratar de actualizar la categoría.",
      });
    });
    
};

const eliminarCategoria = (req, res) => {
  Categoria.findOne({ where: { id: req.params.id } }).then(
    (categoria_encontrado) => {
      Categoria.update(
        { estado: 0 },
        {
          where: {
            id: categoria_encontrado.id,
          },
        }
      )
        .then((resultado) => {
          return res.status(200).json({
            ok: true,
            content: resultado,
            message: "Categoría eliminada exitosamente.",
          });
        })
        .catch((error) => {
          return res.status(500).json({
            ok: false,
            content: error,
            message: "Ocurrió un problema al tratar de eliminar la categoría deseada.",
          });
        });
    }
  ).catch((error) => {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "La categoría que desea eliminar no existe.",
    });
  });
};

module.exports = {
  obtenerCategorias,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria
}