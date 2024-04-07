import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pozo} from './pozo.model';
import {Perforista} from './perforista.model';
import {PerforistaPerforacion} from './perforista-perforacion.model';

@model(



  {
    settings:{

    foreignKeys:{

      
      fkPozoidPozo2:{
        name: "fkPozoidPozo2",
        entity:"Pozo",
        entityKey:"id",
        foreignKey:"pozoId"

       },



    }

    }





     }
)
export class Perforacion extends Entity {
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

  @belongsTo(() => Pozo)
  pozoId: number;

  @hasMany(() => Perforista, {through: {model: () => PerforistaPerforacion}})
  perforistas: Perforista[];

  constructor(data?: Partial<Perforacion>) {
    super(data);
  }
}

export interface PerforacionRelations {
  // describe navigational properties here
}

export type PerforacionWithRelations = Perforacion & PerforacionRelations;
