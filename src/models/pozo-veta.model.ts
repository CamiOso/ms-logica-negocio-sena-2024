import {Entity, model, property} from '@loopback/repository';

@model()
export class PozoVeta extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  pozoId?: number;

  @property({
    type: 'number',
  })
  vetaId?: number;

  constructor(data?: Partial<PozoVeta>) {
    super(data);
  }
}

export interface PozoVetaRelations {
  // describe navigational properties here
}

export type PozoVetaWithRelations = PozoVeta & PozoVetaRelations;
