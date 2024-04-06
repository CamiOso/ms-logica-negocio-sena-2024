import {Entity, model, property} from '@loopback/repository';

@model()
export class Mineral extends Entity {
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
  formulaQuimica: string;


  constructor(data?: Partial<Mineral>) {
    super(data);
  }
}

export interface MineralRelations {
  // describe navigational properties here
}

export type MineralWithRelations = Mineral & MineralRelations;
