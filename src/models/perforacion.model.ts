import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Perforacion>) {
    super(data);
  }
}

export interface PerforacionRelations {
  // describe navigational properties here
}

export type PerforacionWithRelations = Perforacion & PerforacionRelations;
