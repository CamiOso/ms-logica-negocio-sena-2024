import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Laboratorio, LaboratorioRelations} from '../models';

export class LaboratorioRepository extends DefaultCrudRepository<
  Laboratorio,
  typeof Laboratorio.prototype.id,
  LaboratorioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Laboratorio, dataSource);
  }
}
