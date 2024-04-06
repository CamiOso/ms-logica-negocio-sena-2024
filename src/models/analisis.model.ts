import {Entity, model, property} from '@loopback/repository';

@model()
export class Analisis extends Entity {
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


  constructor(data?: Partial<Analisis>) {
    super(data);
  }
}

export interface AnalisisRelations {
  // describe navigational properties here
}

export type AnalisisWithRelations = Analisis & AnalisisRelations;
