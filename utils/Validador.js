const jsonwebtoken = require("jsonwebtoken")

const verificarJSONWebToken = (token) => {
    try {
        let tokenVerificado = jsonwebtoken.verify(token, "codigo", {algorithm : "RS256"})
        console.log(tokenVerificado)
        return tokenVerificado
    } catch (error){
        console.log(error)
        return null
    }
}

const inspeccionador = (req,res, next) => {
    console.log(req.headers)
    if (req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1]
        console.log(token)
        let tokenVerificado = verificarJSONWebToken(token)

        if (tokenVerificado){
            next()
        }
        
        else {
            res.status(401).json({
                ok : false,
                content : null,
                message : "No esta autorizado para realizar esta solicitud"
            })
        }
    }

    else {
        res.status(401).json({
            ok : false,
            content : null,
            message : "Necesita estar autenticado para realizar esta peticion"
        })
    }
}

module.exports = {
    inspeccionador
}