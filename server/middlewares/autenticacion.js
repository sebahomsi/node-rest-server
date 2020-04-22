const jwt = require('jsonwebtoken');

//===============
//Verificar Token
//===============

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

    // res.json({
    //     token
    // });

}

//===========================
//Verificar Rol Administrador
//===========================

let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario debe ser administrador'
            }
        });
    }

    next();
}

module.exports = {
    verificaToken,
    verificaAdmin
}