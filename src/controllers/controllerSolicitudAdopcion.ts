import { Request, Response, NextFunction } from "express";
import SolicitudAdopcion from "../models/solicitud-adopcion/modelSolicitudAdopcion"; 
import Adoptante from "../models/usuarios/modelAdoptante";
import Animal from "../models/usuarios/modelAnimal";
import Fundacion from "../models/usuarios/modelFundacion";
var mongoose = require('mongoose');

class ControllerSolicitudAdopcion{
  public async crearSolicitud( req: Request, res: Response, next: NextFunction)
  {
    const solicitud = new SolicitudAdopcion({
      idAdoptante :req.body.adoptante._id,
      idFundacion : mongoose.Types.ObjectId(req.body.idFundacion),
      idAnimal : req.body.animal._id,
      idFormulario: null,
      fecha_solicitud: req.body.fecha,
      estado : req.body.estado
    });

    console.log(solicitud);

    solicitud
      .save()
      .then((result: any) => {
        res.status(201).json({
          message: "Solicitud creada",
          result: result,
        });
      })
      .catch((err: any) => {
        res.status(500).json({
          error: err,
        });
      });
    
    const idUser = solicitud.idAdoptante;
    const idFunda = solicitud.idFundacion;
    const adoptanteUpdate = await Adoptante.findByIdAndUpdate(
      idUser,
      { $push :{ solicitudesAdoptante: solicitud._id } },
      { new: true, useFindAndModify: false }
    );

    console.log("Adoptante actualizado correctamente", adoptanteUpdate);

    const fundacionUpdate = await Fundacion.findByIdAndUpdate(
      idFunda,
      { $push: { solicitudesFundacion: solicitud._id } },
      { new: true, useFindAndModify: false }
    );

    console.log("Fundacion actualizada correctamente", fundacionUpdate);
  }
  /*
  Param = id : idSolicitud
  */
  public async getSolicitud( req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const solicitud = await SolicitudAdopcion.findById(id);
    return res.status(200).json(solicitud);
  }

  public async getSolicitudes( req: Request, res: Response): Promise<Response> {
    const solicitudes = await SolicitudAdopcion.find();
    return res.status(200).json(solicitudes);
  }
  /*
  Param = id: IdAdoptante
  Return Solicitud[]
  */
  public async getSolicitudesAdoptante( req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    var solicitudes: any[] = [];

    try{
      const adoptante = await Adoptante.findById(id);
      if( adoptante!.solicitudesAdoptante !== undefined ){
        for(var solicitud of adoptante!.solicitudesAdoptante){
          var nSolicitud = await SolicitudAdopcion.findById(solicitud); 
          solicitudes.push(nSolicitud);
        } 
      }
    }
    catch (error) {
      console.error(error);
    }
    finally{
      return res.status(200).json(solicitudes);
    }
  }
  /*
  Param = id: IdFundacion
  Return Solicitud[]
  */
  public async getSolicitudesFundacion( req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    var solicitudes: any[] = [];

    try{
      const fundacion = await Fundacion.findById(id);
      if( fundacion!.solicitudesFundacion !== undefined ){
        for(var solicitud of fundacion!.solicitudesFundacion){
          var nSolicitud = await SolicitudAdopcion.findById(solicitud); 
          solicitudes.push(nSolicitud);
        } 
      }
    }
    catch (error) {
      console.error(error);
    }
    finally{
      return res.status(200).json(solicitudes);
    }
  }
  /*
  Param = id: idFundacion
  Return [Fundacion, Solicitud[i], Adoptante[i], Animal[i]]
  */
  public async populateSolicitudesFundacion( req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    var solicitudes: any[] = [];
    var adoptantes: any[] =[];
    var animales: any[] =[];

    const fundacion = await Fundacion.findById(id);

    if( fundacion!.solicitudesFundacion !== undefined )
    {
      console.log("fundacion",fundacion);
      for(var solicitud of fundacion!.solicitudesFundacion)
      {
        var nSolicitud = await SolicitudAdopcion.findById(solicitud).populate("idAnimal");

        var mSolicitud = await SolicitudAdopcion.findById(solicitud).populate("idAdoptante");
        
        console.log("solicitud",solicitud); console.log("nsolicitud",nSolicitud); console.log("msolicitud",mSolicitud);

        solicitudes.push(nSolicitud);

        var adoptante = mSolicitud!.idAdoptante;
        adoptantes.push(adoptante);

        var animal = nSolicitud!.idAnimal;
        animales.push(animal);
      } 
    }
    return res.status(200).json({ fundacion,solicitudes,adoptantes,animales});
  }
  /* 
  Param = id: idSolicitud
  */
  public async deleteSolicitud(req: Request, res: Response): Promise<Response>{
    const id = req.params.id;

    const solicitud = await SolicitudAdopcion.findById(id);

    if(solicitud != null){

      const newAdoptante = await Adoptante.findByIdAndUpdate(
        solicitud?.idAdoptante,
        { $pull: { solicitudesAdoptante: {$in : mongoose.Types.ObjectId( solicitud?._id) } } },
        { new: true, useFindAndModify: false }
      );

      console.log("Paso Adoptante");
    
      const newFundacion = await Fundacion.findByIdAndUpdate(
        solicitud?.idFundacion,
        { $pull: { solicitudesFundacion: {$in : mongoose.Types.ObjectId( solicitud?._id) } } },
        { new: true, useFindAndModify: false }
      );
    
      await SolicitudAdopcion.findByIdAndRemove(id);
    }
    return res.status(200).json({
      message: "2 paso  eliminado satisfactoriamente",solicitud
    });
  }
  /*
  Param = id: idSolicitud
  Body = estado: Nuevo Estado de la solicitud (String) 
  */
  public async updateEstadoSolicitud(req: Request, res: Response): Promise<Response>{
    const id = req.params.id;
    
    const nuevoEstado = req.body.estado;

    const solicitud = await SolicitudAdopcion.findByIdAndUpdate(
      id,
      {$set :{ estado: nuevoEstado} },
      { new: true, useFindAndModify: false }
    );
    return res.status(200).json({
      message: " actualizado satisfactoriamente"
    });
  }
};

export const controllerSolicitudAdopcion= new ControllerSolicitudAdopcion()


