import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fk_Mina_idMina:{
       name: "fk_Mina_idMina",
       entity:"Mina",
       entityKey:"id",
       foreignKey:"minaId"

      },

      fk_Estado_idEstado:{
        name: "fk_Estado_idEstado",
        entity:"Estado",
        entityKey:"id",
        foreignKey:"estadoId"

       },



    }

    }





     }













)
export class EstadoMina extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  minaId?: number;

  @property({
    type: 'number',
  })
  estadoId?: number;

  constructor(data?: Partial<EstadoMina>) {
    super(data);
  }
}

export interface EstadoMinaRelations {
  // describe navigational properties here
}

export type EstadoMinaWithRelations = EstadoMina & EstadoMinaRelations;
