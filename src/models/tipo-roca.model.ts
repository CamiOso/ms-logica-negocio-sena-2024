import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roca} from './roca.model';

@model()
export class TipoRoca extends Entity {
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

  @hasMany(() => Roca)
  rocas: Roca[];

  constructor(data?: Partial<TipoRoca>) {
    super(data);
  }
}

export interface TipoRocaRelations {
  // describe navigational properties here
}

export type TipoRocaWithRelations = TipoRoca & TipoRocaRelations;
