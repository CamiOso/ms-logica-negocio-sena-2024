import {Entity, model, property, hasMany} from '@loopback/repository';
import {Perforista} from './perforista.model';
import {PerforistaPerforacion} from './perforista-perforacion.model';

@model()
export class Equipo extends Entity {
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
  tipoEquipo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  velocidad: number;

  @hasMany(() => Perforista, {through: {model: () => PerforistaPerforacion}})
  perforistas: Perforista[];

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
