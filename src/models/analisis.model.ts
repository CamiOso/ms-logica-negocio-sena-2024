import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoAnalisis} from './tipo-analisis.model';
import {Muestra} from './muestra.model';

@model(

  {
    settings:{

    foreignKeys:{

      fk_TipoAnalisis_idTipoAnalisis:{
       name: "fk_TipoAnalisis_idTipoAnalisis",
       entity:"TipoAnalisis",
       entityKey:"id",
       foreignKey:"tipoAnalisisId"

      },

      fk_Muestra_idMuestra2:{
        name: "fk_Muestra_idMuestra2",
        entity:"Muestra",
        entityKey:"id",
        foreignKey:"muestraId"

       },



    }

    }





     }



)
export class Analisis extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => TipoAnalisis)
  tipoAnalisisId: number;

  @belongsTo(() => Muestra)
  muestraId: number;

  constructor(data?: Partial<Analisis>) {
    super(data);
  }
}

export interface AnalisisRelations {
  // describe navigational properties here
}

export type AnalisisWithRelations = Analisis & AnalisisRelations;
