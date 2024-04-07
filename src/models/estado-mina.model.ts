import {Entity, model, property} from '@loopback/repository';

@model()
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
