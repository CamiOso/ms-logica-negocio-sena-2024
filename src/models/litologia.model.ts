import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roca} from './roca.model';
import {LitologiaRoca} from './litologia-roca.model';

@model()
export class Litologia extends Entity {
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
  profundidadInicial: number;

  @property({
    type: 'number',
    required: true,
  })
  profundidadFinal: number;

  @hasMany(() => Roca, {through: {model: () => LitologiaRoca}})
  rocas: Roca[];

  constructor(data?: Partial<Litologia>) {
    super(data);
  }
}

export interface LitologiaRelations {
  // describe navigational properties here
}

export type LitologiaWithRelations = Litologia & LitologiaRelations;
