import {Entity, model, property} from '@loopback/repository';

@model()
export class Litologia extends Entity {
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
  profundidadInicial: number;

  @property({
    type: 'number',
    required: true,
  })
  profundidadFinal: number;


  constructor(data?: Partial<Litologia>) {
    super(data);
  }
}

export interface LitologiaRelations {
  // describe navigational properties here
}

export type LitologiaWithRelations = Litologia & LitologiaRelations;
