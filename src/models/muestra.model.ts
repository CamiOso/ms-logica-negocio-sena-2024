import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Muestra>) {
    super(data);
  }
}

export interface MuestraRelations {
  // describe navigational properties here
}

export type MuestraWithRelations = Muestra & MuestraRelations;
