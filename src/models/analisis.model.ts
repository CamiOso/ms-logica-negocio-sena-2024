import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TipoAnalisis} from './tipo-analisis.model';
import {Muestra} from './muestra.model';

@model()
export class Analisis extends Entity {
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

  @belongsTo(() => TipoAnalisis)
  tipoAnalisisId: number;

  @belongsTo(() => Muestra)
  muestraId: number;

  constructor(data?: Partial<Analisis>) {
    super(data);
  }
}

export interface AnalisisRelations {
  // describe navigational properties here
}

export type AnalisisWithRelations = Analisis & AnalisisRelations;
