import {Entity, model, property, hasMany} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {EquipoPerforista} from './equipo-perforista.model';
import {Perforacion} from './perforacion.model';
import {PerforistaPerforacion} from './perforista-perforacion.model';

@model()
export class Perforista extends Entity {
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
  primerApellido: string;

  @hasMany(() => Equipo, {through: {model: () => EquipoPerforista}})
  equipos: Equipo[];

  @hasMany(() => Perforacion, {through: {model: () => PerforistaPerforacion}})
  perforaciones: Perforacion[];

  constructor(data?: Partial<Perforista>) {
    super(data);
  }
}

export interface PerforistaRelations {
  // describe navigational properties here
}

export type PerforistaWithRelations = Perforista & PerforistaRelations;
