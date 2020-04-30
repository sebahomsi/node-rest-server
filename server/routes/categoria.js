const express = require('express');

let { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//============================
//Mostrar todas las categorias
//============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({ estado: true })
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });
            });
        });
});

//============================
//Buscar una categoria por ID
//============================
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

//============================
//Crear nueva categoria y devuelve la misma
//============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });
});

//============================
//Actualizar una categoria
//============================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, { descripcion: body.descripcion }, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB,
        });
    });

});

//============================
//Borrar una categoria [Borrado lógico]
//============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, categoriaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (categoriaBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Category not found'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrado,
            message: 'Categoría borrada exitosamente'
        })
    });
});

module.exports = app;