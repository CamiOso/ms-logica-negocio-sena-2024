import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fkPerforistaidPerforista:{
       name: "fkPerforistaidPerforista",
       entity:"Perforista",
       entityKey:"id",
       foreignKey:"perforistaId"

      },

      fkPerforacionidPerforacion:{
        name: "fkPerforacionidPerforacion",
        entity:"Perforacion",
        entityKey:"id",
        foreignKey:"perforacionId"

       },



    }

    }





     }





)
export class PerforistaPerforacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  equipoId?: number;

  @property({
    type: 'number',
  })
  perforistaId?: number;

  @property({
    type: 'number',
  })
  perforacionId?: number;

  constructor(data?: Partial<PerforistaPerforacion>) {
    super(data);
  }
}

export interface PerforistaPerforacionRelations {
  // describe navigational properties here
}

export type PerforistaPerforacionWithRelations = PerforistaPerforacion & PerforistaPerforacionRelations;
