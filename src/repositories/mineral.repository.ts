import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mineral, MineralRelations} from '../models';

export class MineralRepository extends DefaultCrudRepository<
  Mineral,
  typeof Mineral.prototype.id,
  MineralRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Mineral, dataSource);
  }
}
