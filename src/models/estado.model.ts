import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mina} from './mina.model';
import {EstadoMina} from './estado-mina.model';

@model()
export class Estado extends Entity {
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

  @hasMany(() => Mina, {through: {model: () => EstadoMina}})
  minas: Mina[];

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
