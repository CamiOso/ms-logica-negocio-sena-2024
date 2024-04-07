import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fk_Planeador_idPlaneador:{
       name: "fk_Planeador_idPlaneador",
       entity:"Planeador",
       entityKey:"id",
       foreignKey:"planeadorId"

      },

      fk_Pozo_idPozo:{
        name: "fk_Pozo_idPozo",
        entity:"Pozo",
        entityKey:"id",
        foreignKey:"pozoId"

       },



    }

    }





     }



)
export class Diseno extends Entity {
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

  @property({
    type: 'number',
  })
  planeadorId?: number;

  @property({
    type: 'number',
  })
  pozoId?: number;

  constructor(data?: Partial<Diseno>) {
    super(data);
  }
}

export interface DisenoRelations {
  // describe navigational properties here
}

export type DisenoWithRelations = Diseno & DisenoRelations;
