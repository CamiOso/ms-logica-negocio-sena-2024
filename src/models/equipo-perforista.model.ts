import {Entity, model, property} from '@loopback/repository';

@model()
export class EquipoPerforista extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;


  constructor(data?: Partial<EquipoPerforista>) {
    super(data);
  }
}

export interface EquipoPerforistaRelations {
  // describe navigational properties here
}

export type EquipoPerforistaWithRelations = EquipoPerforista & EquipoPerforistaRelations;
