    
function crearAnimal(){

    console.log("Creando gato");
    console.log(req.body);
    const gato = new Gato({
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        sexo: req.body.sexo,
        color_ojos: req.body.color_ojos,
        tipo_pelaje: req.body.tipo_pelaje,
        situacion: req.body.situacion,
        ultima_vac: req.body.ultima_vac,
        desparasitado: req.body.desparasitado,
        descripcion: req.body.descripcion,
        esquema_vac: req.body.esquema_vac
    });
    console.log(gato)
    gato.save()
    .then(result =>{
        res.status(201).json({
            message: 'Gato creado',
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports = crearAnimal;