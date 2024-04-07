import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Analisis} from './analisis.model';

@model()
export class Resultados extends Entity {
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
  porcentajeAu: number;

  @property({
    type: 'number',
    required: true,
  })
  porcentajeAg: number;

  @belongsTo(() => Analisis)
  analisisId: number;

  constructor(data?: Partial<Resultados>) {
    super(data);
  }
}

export interface ResultadosRelations {
  // describe navigational properties here
}

export type ResultadosWithRelations = Resultados & ResultadosRelations;
