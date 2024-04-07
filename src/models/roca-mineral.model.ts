import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fkRocaidRoca:{
       name: "fkRocaidRoca",
       entity:"Roca",
       entityKey:"id",
       foreignKey:"rocaId"

      },

      fk_Mineral_idMineral:{
        name: "fk_Mineral_idMineral",
        entity:"Mineral",
        entityKey:"id",
        foreignKey:"mineralId"

       },



    }

    }





     }






)
export class RocaMineral extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  mineralId?: number;

  @property({
    type: 'number',
  })
  rocaId?: number;

  constructor(data?: Partial<RocaMineral>) {
    super(data);
  }
}

export interface RocaMineralRelations {
  // describe navigational properties here
}

export type RocaMineralWithRelations = RocaMineral & RocaMineralRelations;
