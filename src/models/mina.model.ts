import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Estado} from './estado.model';
import {EstadoMina} from './estado-mina.model';

@model(

  {
    settings:{

    foreignKeys:{

      fk_Departamento_idDepartamento:{
       name: "fk_Departamento_idDepartamento",
       entity:"Departamento",
       entityKey:"id",
       foreignKey:"departamentoId"

      }
    }

    }





     }






)
export class Mina extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  @property({
    type: 'string',
    required: false,
  })
  foto: string;






  @belongsTo(() => Departamento)
  departamentoId: number;

  @hasMany(() => Estado, {through: {model: () => EstadoMina}})
  estados: Estado[];

  constructor(data?: Partial<Mina>) {
    super(data);
  }
}

export interface MinaRelations {
  // describe navigational properties here
}

export type MinaWithRelations = Mina & MinaRelations;
