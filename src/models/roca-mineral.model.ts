import {Entity, model, property} from '@loopback/repository';

@model()
export class RocaMineral extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<RocaMineral>) {
    super(data);
  }
}

export interface RocaMineralRelations {
  // describe navigational properties here
}

export type RocaMineralWithRelations = RocaMineral & RocaMineralRelations;
