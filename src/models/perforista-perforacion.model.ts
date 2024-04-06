import {Entity, model, property} from '@loopback/repository';

@model()
export class PerforistaPerforacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<PerforistaPerforacion>) {
    super(data);
  }
}

export interface PerforistaPerforacionRelations {
  // describe navigational properties here
}

export type PerforistaPerforacionWithRelations = PerforistaPerforacion & PerforistaPerforacionRelations;
