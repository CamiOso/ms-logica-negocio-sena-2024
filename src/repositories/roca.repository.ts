import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Roca, RocaRelations} from '../models';

export class RocaRepository extends DefaultCrudRepository<
  Roca,
  typeof Roca.prototype.id,
  RocaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Roca, dataSource);
  }
}
