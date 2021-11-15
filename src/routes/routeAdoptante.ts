import express, { Request, Response, NextFunction } from "express";
import { controllerAdoptante } from "../controllers/usuarios/controllerAdoptante";

import multer from "../lib/multer";
import { tokenValidation } from "../lib/validateToken";

const router = express.Router();

const dashboardPath = "dashboard-adoptante";
const adoptantePath = "traer-adoptante";
const perfilPath = "mi-cuenta";
const entidadPath = "crear-cuenta";
const usuarioPath = "crear-adoptante";
const adopcionesPath = "obtener-adopciones";

router.post(
  `/${entidadPath}/${usuarioPath}`,
  multer.single("image"),
  controllerAdoptante.crearAdoptante
);

router.get(
  `/${dashboardPath}/${adoptantePath}/:id`,
  controllerAdoptante.getAdoptante
);

router.get(`/${dashboardPath}/traer-todos`, controllerAdoptante.getAdoptantes);

router.get(
  `/${dashboardPath}/${perfilPath}/:id`,
  tokenValidation,
  controllerAdoptante.getAdoptante
);

router.get(
  `/${dashboardPath}/${adopcionesPath}/:id`,
  tokenValidation,
  controllerAdoptante.getAnimalesAdoptados
);

router.put(
  `/${dashboardPath}/${perfilPath}/:id`,
  [multer.single("image"), tokenValidation],
  controllerAdoptante.updateAdoptante
);

router.delete(
  `/${dashboardPath}/${perfilPath}/:id`,
  controllerAdoptante.deleteAdoptante
);

module.exports = router;
