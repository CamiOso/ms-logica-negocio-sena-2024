import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roca} from './roca.model';
import {RocaMineral} from './roca-mineral.model';

@model()
export class Mineral extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  formulaQuimica: string;

  @hasMany(() => Roca, {through: {model: () => RocaMineral}})
  rocas: Roca[];

  constructor(data?: Partial<Mineral>) {
    super(data);
  }
}

export interface MineralRelations {
  // describe navigational properties here
}

export type MineralWithRelations = Mineral & MineralRelations;
