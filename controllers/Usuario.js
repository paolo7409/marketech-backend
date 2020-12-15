const {Usuario} = require("../config/Sequelize")

const CrearCuenta = (req, res) => {

    const MensajedeUsuarioRepetido = (datorepetido) => {
        res.status(400).json({
            ok : false,
            content : null,
            message : `el ${datorepetido} ingresado ya esta en uso`
        })
    }

    const CrearUsuario = () => {
        let nuevoUsuario = Usuario.build(req.body)
        nuevoUsuario.encriptarContrasena(req.body.usuarioContrasena)
        nuevoUsuario.save().then((usuarioCreado) => {
            return res.status(201).json({
                ok : true,
                content : usuarioCreado,
                message : "Usuario creado exitosamente"
            })
        })
    }

    const MensajedeError = (error) => {
        res.status(500).json({
            ok : false,
            content : error,
            message : "Ocurrio un error al tratar de crear al usuario"
        })
    }

    Usuario.findOne({where : {usuarioNombre : req.body.usuarioNombre}}).then((usuarioRepetido) => {
        if (usuarioRepetido){
            MensajedeUsuarioRepetido("nombre")
        }

        else{
            CrearUsuario()
        }
    }).catch((error) => {
        MensajedeError(error)
    })

    Usuario.findOne({where : {usuarioCorreo : req.body.usuarioCorreo}}).then((usuarioRepetido) => {
        if (usuarioRepetido){
            MensajedeUsuarioRepetido("correo")
        }

        else{
            CrearUsuario()
        }
    }).catch((error) => {
        MensajedeError(error)
    })

    Usuario.findOne({where : {usuarioTelefono : req.body.usuarioTelefono}}).then((usuarioRepetido) => {
        if (usuarioRepetido){
            MensajedeUsuarioRepetido("telefono")
        }

        else{
            CrearUsuario()
        }
    }).catch((error) => {
        MensajedeError(error)
    })


}

module.exports = {
    CrearCuenta
}