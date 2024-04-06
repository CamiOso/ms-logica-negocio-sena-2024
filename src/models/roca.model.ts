import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Roca extends Entity {
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
  descripcion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roca>) {
    super(data);
  }
}

export interface RocaRelations {
  // describe navigational properties here
}

export type RocaWithRelations = Roca & RocaRelations;
