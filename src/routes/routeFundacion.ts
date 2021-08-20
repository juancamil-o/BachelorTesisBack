import express, {Request, Response, NextFunction} from 'express';
import { controllerFundacion } from '../controllers/controllerFundacion';

const router = express.Router();

const entidadPath = "crear-cuenta";
const usuarioPath = "crear-fundacion";


router.get(`/${entidadPath}/${usuarioPath}`, controllerFundacion.dentroFundacion);

router.post(`/${entidadPath}/${usuarioPath}`, controllerFundacion.crearFundacion);



/*
router.post("/crear-cuenta/crear-fundacion", (req, res, next) =>{
    //bcrypt.hash(req.body.password, 10)
    //.then(function(hash) {
        console.log("Creando fundacion");
        console.log(req.body);
        const fundacion = new Fundacion({
            nombreFund: req.body.nombreFund,
            nombreEncar: req.body.nombreEncar,
            apellidosEncar: req.body.apellidosEncar,
            fecha_creacion: req.body.fecha_creacion,
            localidad: req.body.localidad,
            correo: req.body.correo,
            num_celular: req.body.num_celular,
            contrasena: req.body.contrasena,
            tipo_usuario: 'Fundacion'
        });
        console.log(fundacion)
        fundacion.save()
        const token = jwt.sign({_id: fundacion._id}, 'fundacionkey')
        res.status(200).json({token});

        //.then(result => {
          //  res.status(201).json({
            //    message: 'Fundación creada',
              //  result: result
            //});
        //})
        //.catch(err => {
          //  res.status(500).json({
            //    error: err
            //});
        //});
    //});
});
*/


module.exports = router;
//export default router;