const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');


const schema_gato = mongoose.Schema({
    nombre: {type: String, required: true},
    edad: {type: String, required: true},
    raza: {type: String, required: true},
    sexo: {type: String, required: true},
    color_ojos: {type: String, required: true},
    tipo_pelaje: {type: String, required: true},
    situacion: {type: String, required: true},
    ultima_vac: {type: Date, required: true},
    desparasitado: {type: String, required: true},
    descripcion: {type: String, required: true},
    esquema_vac: {type: Array, required: true}
});

schema_gato.plugin(uniqueValidator);

module.exports = mongoose.model('Gato', schema_gato);