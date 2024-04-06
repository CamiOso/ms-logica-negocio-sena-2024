import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoRoca extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<TipoRoca>) {
    super(data);
  }
}

export interface TipoRocaRelations {
  // describe navigational properties here
}

export type TipoRocaWithRelations = TipoRoca & TipoRocaRelations;
