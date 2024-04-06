import {Entity, model, property} from '@loopback/repository';

@model()
export class Laboratorio extends Entity {
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


  constructor(data?: Partial<Laboratorio>) {
    super(data);
  }
}

export interface LaboratorioRelations {
  // describe navigational properties here
}

export type LaboratorioWithRelations = Laboratorio & LaboratorioRelations;
