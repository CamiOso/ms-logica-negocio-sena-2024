import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pozo, PozoRelations} from '../models';

export class PozoRepository extends DefaultCrudRepository<
  Pozo,
  typeof Pozo.prototype.id,
  PozoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Pozo, dataSource);
  }
}
