import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mina, MinaRelations} from '../models';

export class MinaRepository extends DefaultCrudRepository<
  Mina,
  typeof Mina.prototype.id,
  MinaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Mina, dataSource);
  }
}
