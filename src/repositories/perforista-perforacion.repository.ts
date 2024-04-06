import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PerforistaPerforacion, PerforistaPerforacionRelations} from '../models';

export class PerforistaPerforacionRepository extends DefaultCrudRepository<
  PerforistaPerforacion,
  typeof PerforistaPerforacion.prototype.id,
  PerforistaPerforacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PerforistaPerforacion, dataSource);
  }
}
