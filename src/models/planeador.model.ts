import {Entity, model, property} from '@loopback/repository';

@model()
export class Planeador extends Entity {
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
  segundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;


  constructor(data?: Partial<Planeador>) {
    super(data);
  }
}

export interface PlaneadorRelations {
  // describe navigational properties here
}

export type PlaneadorWithRelations = Planeador & PlaneadorRelations;
