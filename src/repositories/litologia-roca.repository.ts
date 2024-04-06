import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LitologiaRoca, LitologiaRocaRelations} from '../models';

export class LitologiaRocaRepository extends DefaultCrudRepository<
  LitologiaRoca,
  typeof LitologiaRoca.prototype.id,
  LitologiaRocaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(LitologiaRoca, dataSource);
  }
}
