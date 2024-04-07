import {Entity, model, property} from '@loopback/repository';

@model(

  {
    settings:{

    foreignKeys:{

      fk_Litologia_idLitologia:{
       name: "fk_Litologia_idLitologia",
       entity:"Litologia",
       entityKey:"id",
       foreignKey:"litologiaId"

      },

      fk_Roca_idRoca:{
        name: "fk_Roca_idRoca",
        entity:"Roca",
        entityKey:"id",
        foreignKey:"rocaId"

       },



    }

    }





     }




)
export class LitologiaRoca extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  litologiaId?: number;

  @property({
    type: 'number',
  })
  rocaId?: number;

  constructor(data?: Partial<LitologiaRoca>) {
    super(data);
  }
}

export interface LitologiaRocaRelations {
  // describe navigational properties here
}

export type LitologiaRocaWithRelations = LitologiaRoca & LitologiaRocaRelations;
