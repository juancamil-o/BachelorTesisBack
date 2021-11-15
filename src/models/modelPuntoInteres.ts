import mongoose, { Schema, Document } from "mongoose";

import geocoder from "../lib/geocoder";

interface PuntoDeInteres extends Document {
  titulo: string;
  descripcion: string;
  direccion: string | undefined;
  autorPuntoDeInteres: mongoose.Types.ObjectId;
  ubicacion: any;
  longitud: number;
  latitud: number;
}

const schema_punto_de_interes: Schema<PuntoDeInteres> =
  new Schema<PuntoDeInteres>({
    titulo: {
      type: String,
      required: [true, "Por favor ingrese un título para el punto de interés."],
    },
    descripcion: {
      type: String,
      required: [true, "Debe ingresar una descripción para el punto."],
    },
    direccion: {
      type: String,
      required: [true, "Debe ingresar una dirección para el punto."],
    },
    autorPuntoDeInteres: { type: mongoose.Types.ObjectId, ref: "Fundacion" },
    ubicacion: {
      type: {
        type: String,
        enum: ["Point"], // 'location.type' must be 'Point'
        //required: true,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
        //required: true,
      },
      direccionFormateada: String,
    },
    longitud: { type: Number },
    latitud: { type: Number },
  });

// schema_punto_de_interes.pre("save", async function (next) {
//   const loc = await geocoder.geocode(this.direccion!);
//   //  console.log(loc);
//   this.ubicacion = {
//     type: "Point",
//     coordinates: [loc[0].longitude, loc[0].latitude],
//     direccionFormateada: loc[0].formattedAddress,
//   };

//   // this.direccion = undefined;
//   next();
// });

export default mongoose.model<PuntoDeInteres>(
  "PuntoDeInteres",
  schema_punto_de_interes
);
