import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoRoca, TipoRocaRelations} from '../models';

export class TipoRocaRepository extends DefaultCrudRepository<
  TipoRoca,
  typeof TipoRoca.prototype.id,
  TipoRocaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoRoca, dataSource);
  }
}
