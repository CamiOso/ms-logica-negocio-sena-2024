import {Entity, model, property} from '@loopback/repository';

@model()
export class Veta extends Entity {
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


  constructor(data?: Partial<Veta>) {
    super(data);
  }
}

export interface VetaRelations {
  // describe navigational properties here
}

export type VetaWithRelations = Veta & VetaRelations;
