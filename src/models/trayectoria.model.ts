import {Entity, model, property} from '@loopback/repository';

@model()
export class Trayectoria extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  dip: number;

  @property({
    type: 'number',
    required: true,
  })
  azimuth: number;


  constructor(data?: Partial<Trayectoria>) {
    super(data);
  }
}

export interface TrayectoriaRelations {
  // describe navigational properties here
}

export type TrayectoriaWithRelations = Trayectoria & TrayectoriaRelations;
