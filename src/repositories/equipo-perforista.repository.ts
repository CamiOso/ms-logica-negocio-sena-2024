import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EquipoPerforista, EquipoPerforistaRelations} from '../models';

export class EquipoPerforistaRepository extends DefaultCrudRepository<
  EquipoPerforista,
  typeof EquipoPerforista.prototype.id,
  EquipoPerforistaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EquipoPerforista, dataSource);
  }
}
