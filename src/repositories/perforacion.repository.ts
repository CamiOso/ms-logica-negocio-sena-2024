import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Perforacion, PerforacionRelations} from '../models';

export class PerforacionRepository extends DefaultCrudRepository<
  Perforacion,
  typeof Perforacion.prototype.id,
  PerforacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Perforacion, dataSource);
  }
}
