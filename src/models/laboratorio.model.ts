import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fkMuestra_idMuestra:{
       name: "fkMuestra_idMuestra",
       entity:"Muestra",
       entityKey:"id",
       foreignKey:"muestraId"

      }


    }

    }





     }

)
export class Laboratorio extends Entity {
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
    type: 'number',
  })
  muestraId?: number;



  constructor(data?: Partial<Laboratorio>) {
    super(data);
  }
}

export interface LaboratorioRelations {
  // describe navigational properties here
}

export type LaboratorioWithRelations = Laboratorio & LaboratorioRelations;
