import {Entity, model, property} from '@loopback/repository';

@model()
export class Mina extends Entity {
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


  constructor(data?: Partial<Mina>) {
    super(data);
  }
}

export interface MinaRelations {
  // describe navigational properties here
}

export type MinaWithRelations = Mina & MinaRelations;
