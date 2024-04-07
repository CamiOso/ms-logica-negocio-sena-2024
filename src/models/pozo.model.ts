import {Entity, model, property, hasMany} from '@loopback/repository';
import {Planeador} from './planeador.model';
import {Diseno} from './diseno.model';
import {Veta} from './veta.model';
import {PozoVeta} from './pozo-veta.model';

@model()
export class Pozo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  profundidad: number;

  @property({
    type: 'number',
    required: true,
  })
  coordenadaX: number;

  @property({
    type: 'number',
    required: true,
  })
  coordenadaY: number;

  @property({
    type: 'number',
    required: true,
  })
  coordenadaZ: number;

  @hasMany(() => Planeador, {through: {model: () => Diseno}})
  planeadores: Planeador[];

  @hasMany(() => Veta, {through: {model: () => PozoVeta}})
  vetas: Veta[];

  constructor(data?: Partial<Pozo>) {
    super(data);
  }
}

export interface PozoRelations {
  // describe navigational properties here
}

export type PozoWithRelations = Pozo & PozoRelations;
