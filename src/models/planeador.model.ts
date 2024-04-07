import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pozo} from './pozo.model';
import {Diseno} from './diseno.model';

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

  @hasMany(() => Pozo, {through: {model: () => Diseno}})
  pozos: Pozo[];

  constructor(data?: Partial<Planeador>) {
    super(data);
  }
}

export interface PlaneadorRelations {
  // describe navigational properties here
}

export type PlaneadorWithRelations = Planeador & PlaneadorRelations;
