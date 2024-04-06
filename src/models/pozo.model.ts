import {Entity, model, property} from '@loopback/repository';

@model()
export class Pozo extends Entity {
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
  coordenadaX: number;

  @property({
    type: 'number',
    required: true,
  })
  coordenadaY: number;

  @property({
    type: 'number',
    required: true,
  })
  coordenadaZ: number;


  constructor(data?: Partial<Pozo>) {
    super(data);
  }
}

export interface PozoRelations {
  // describe navigational properties here
}

export type PozoWithRelations = Pozo & PozoRelations;
