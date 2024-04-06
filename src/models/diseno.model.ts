import {Entity, model, property} from '@loopback/repository';

@model()
export class Diseno extends Entity {
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


  constructor(data?: Partial<Diseno>) {
    super(data);
  }
}

export interface DisenoRelations {
  // describe navigational properties here
}

export type DisenoWithRelations = Diseno & DisenoRelations;
