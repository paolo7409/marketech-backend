const Sequelize = require("sequelize")
const crypto = require("crypto")
const jsonwebtoken = require("jsonwebtoken")

const usuario_model = (conexion) => {
    let usuario = conexion.define("usuarios", {
        idUsuario : {
            field : "id_usuario",
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },

        usuarioNombre : {
            field : "usuario_nombre",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioApellido : {
            field : "usuario_apellido",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioFechaDeNacimiento : {
            field : "usuario_fechadenacimiento",
            type : Sequelize.DATE,
            allowNull : false
        },

        usuarioCorreo : {
            field : "usuario_correo",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioDescripcion : {
            field : "usuario_descripcion",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioTelefono : {
            field : "usuario_telefono",
            type : Sequelize.INTEGER,
            allowNull : false
        },

        usuarioSexo : {
            field : "usuario_sexo",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioAvatar : {
            field : "usuario_avatar",
            type : Sequelize.TEXT,
            defaultValue : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymjxHoVB2hlH41ioYDjkzOd7oVPhJu-uIeQ&usqp=CAU"
        },

        usuarioDireccion : {
            field : "usuario_direccion",
            type : Sequelize.STRING,
            allowNull : false
        },

        usuarioSalt : {
            field : "usuario_salt",
            type : Sequelize.TEXT
        },

        usuarioHash : {
            field : "usuario_hash",
            type : Sequelize.TEXT
        }
    },{
        tableName : "usuarios",
        timestamps : true
    })

    usuario.prototype.encriptarContrasena = function(contrasena) {
        this.usuarioSalt = crypto.randomBytes(16).toString("hex")
        this.usuarioHash = crypto.pbkdf2Sync(contrasena, this.usuarioSalt, 1000, 64, "sha512").toString("hex")
    }

    usuario.prototype.validarContrasena = function(contrasena) {
        let hashTemporal = crypto.pbkdf2Sync(contrasena, this.usuarioSalt, 1000, 64, "sha512").toString("hex")
        if (hashTemporal === this.usuarioHash){
            return true
        }

        else {
            return false
        }
    }

    usuario.prototype.generarJSONWebToken = function() {
        let payload = {
            usuarioId :  this.usuarioId,
            usuarioNombre : this.usuarioNombre + " "  + this.usuarioCorreo
        }

        let token = jsonwebtoken.sign(payload, "codigo", {expiresIn : 3000}, {algorithm : "RS256"})
        console.log(token)
        return token
    }

    return usuario
}

module.exports = usuario_model