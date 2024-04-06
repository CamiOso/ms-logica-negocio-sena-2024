import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RocaMineral, RocaMineralRelations} from '../models';

export class RocaMineralRepository extends DefaultCrudRepository<
  RocaMineral,
  typeof RocaMineral.prototype.id,
  RocaMineralRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RocaMineral, dataSource);
  }
}
