"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const modelPerro_1 = __importDefault(require("../models/modelPerro"));
router.get("/dashboard/seleccion-animal/crear-animal-perro", (req, res, next) => {
    res.send([4, 4, 4]);
    res.end();
    console.log("Dentro de crear perro");
    //next();
});
router.post("/dashboard/seleccion-animal/crear-animal-perro", (req, res) => {
    console.log("Creando perro");
    console.log(req.body);
    const perro = new modelPerro_1.default({
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        sexo: req.body.sexo,
        tamano: req.body.tamano,
        color_ojos: req.body.color_ojos,
        tipo_pelaje: req.body.tipo_pelaje,
        color_pelaje: req.body.color_pelaje,
        situacion: req.body.situacion,
        desparasitado: req.body.desparasitado,
        ultima_vac: req.body.ultima_vac,
        descripcion: req.body.descripcion,
        esquema_vac: req.body.esquema_vac
    });
    console.log(perro);
    perro.save()
        .then(result => {
        res.status(201).json({
            message: 'Perro creado',
            result: result
        });
    })
        .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
module.exports = router;
//export default router;