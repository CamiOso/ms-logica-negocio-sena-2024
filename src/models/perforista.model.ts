import {Entity, model, property} from '@loopback/repository';

@model()
export class Perforista extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;


  constructor(data?: Partial<Perforista>) {
    super(data);
  }
}

export interface PerforistaRelations {
  // describe navigational properties here
}

export type PerforistaWithRelations = Perforista & PerforistaRelations;
