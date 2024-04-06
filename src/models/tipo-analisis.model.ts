import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoAnalisis extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<TipoAnalisis>) {
    super(data);
  }
}

export interface TipoAnalisisRelations {
  // describe navigational properties here
}

export type TipoAnalisisWithRelations = TipoAnalisis & TipoAnalisisRelations;
