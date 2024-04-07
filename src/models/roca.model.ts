import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoRoca} from './tipo-roca.model';
import {Mineral} from './mineral.model';
import {RocaMineral} from './roca-mineral.model';
import {Litologia} from './litologia.model';
import {LitologiaRoca} from './litologia-roca.model';

@model(
  {
 settings:{

 foreignKeys:{

   fk_tipoRoca_idTipoRoca:{
    name: "fk_tipoRoca_idTipoRoca",
    entity:"TipoRoca",
    entityKey:"id",
    foreignKey:"tipoRocaId"

   }
 }

 }





  }



)
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

  @belongsTo(() => TipoRoca)
  tipoRocaId: number;

  @hasMany(() => Mineral, {through: {model: () => RocaMineral}})
  minerales: Mineral[];

  @hasMany(() => Litologia, {through: {model: () => LitologiaRoca}})
  litologias: Litologia[];
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
