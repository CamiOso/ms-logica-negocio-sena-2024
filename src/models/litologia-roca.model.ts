import {Entity, model, property} from '@loopback/repository';

@model()
export class LitologiaRoca extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<LitologiaRoca>) {
    super(data);
  }
}

export interface LitologiaRocaRelations {
  // describe navigational properties here
}

export type LitologiaRocaWithRelations = LitologiaRoca & LitologiaRocaRelations;
