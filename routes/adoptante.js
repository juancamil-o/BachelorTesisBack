const express = require('express');
const router = express.Router();


//const bcrypt = require ('bcrypt');

const Adoptante = require('../src/models/adoptante');

const jwt = require('jsonwebtoken');
const app = require('../app');


router.get("/crear-cuenta/crear-adoptante", (req, res, next) =>{
    res.send([1,2,3]);
    console.log("Dentro de adoptante");
    next();
});


router.post("/crear-cuenta/crear-adoptante",(req, res, next) =>{
    //bcrypt.hash(req.body.password, 10)
    //.then(function(hash) {
        console.log("Creando adoptante");
        console.log(req.body);
        const adoptante = new Adoptante({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            fecha_nacimiento: req.body.fecha_nacimiento,
            genero: req.body.genero,
            localidad: req.body.localidad,
            correo: req.body.correo,
            num_celular: req.body.num_celular,
            password: req.body.password,
            tipo_usuario: 'Adoptante'
        });
        console.log(adoptante)
        adoptante.save()
        .then(result => {
            res.status(201).json({
                message: 'Adoptante creado',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    //});
});


/*
router.post("/crear-cuenta/crear-adoptante", async (req, res, next) =>{
    //bcrypt.hash(req.body.password, 10)
    //.then(function(hash) {
        console.log("Creando adoptante");
        console.log(req.body);
        const adoptante = new Adoptante({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            fecha_nacimiento: req.body.fecha_nacimiento,
            genero: req.body.genero,
            localidad: req.body.localidad,
            correo: req.body.correo,
            num_celular: req.body.num_celular,
            password: req.body.password,
            tipo_usuario: 'Adoptante'
        });
        console.log(adoptante)
        await adoptante.save()
        const token = jwt.sign({_id: adoptante._id}, 'adoptantekey')  
        res.status(201).json({
                token
                //message: 'Adoptante creado',
                //result: result
            });
        
        //.catch(err => {
            //res.status(500).json({
                //error: err
            //});
        //});
    //});
});*/


module.exports = router;