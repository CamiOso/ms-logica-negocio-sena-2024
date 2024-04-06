import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Perforista, PerforistaRelations} from '../models';

export class PerforistaRepository extends DefaultCrudRepository<
  Perforista,
  typeof Perforista.prototype.id,
  PerforistaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Perforista, dataSource);
  }
}
