import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pozo} from './pozo.model';
import {PozoVeta} from './pozo-veta.model';

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

  @hasMany(() => Pozo, {through: {model: () => PozoVeta}})
  pozos: Pozo[];

  constructor(data?: Partial<Veta>) {
    super(data);
  }
}

export interface VetaRelations {
  // describe navigational properties here
}

export type VetaWithRelations = Veta & VetaRelations;
