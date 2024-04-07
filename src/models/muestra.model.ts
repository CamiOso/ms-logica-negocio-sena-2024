import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Litologia} from './litologia.model';

@model(


  {
    settings:{

    foreignKeys:{

      fk_Litologia_idLitologia2:{
       name: "fk_Litologia_idLitologia2",
       entity:"Litologia",
       entityKey:"id",
       foreignKey:"litologiaId"

      }


    }

    }





     }




)
export class Muestra extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  profundidad: number;

  @property({
    type: 'number',
    required: true,
  })
  longitud: number;

  @property({
    type: 'string',
    required: false,
  })
  foto: string;

  @belongsTo(() => Litologia)
  litologiaId: number;

  constructor(data?: Partial<Muestra>) {
    super(data);
  }
}

export interface MuestraRelations {
  // describe navigational properties here
}

export type MuestraWithRelations = Muestra & MuestraRelations;
